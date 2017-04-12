'use strict';
import * as pgContext from '../contexts/pg.context.js';

class UserBusiness {

	constructor() { }

    get(userId) {
        let mainQuery = `select * from users
                            where id = ${userId}`

        return pgContext.query(mainQuery)
          .then(user => {
            let fetchCompaniesQuery = `select 
                                          c.id,
                                          c.created_at,
                                          c.name,
                                          t.contact_user as isContact
                                      from teams t
                                          inner join companies c on c.id = t.company_id
                                          where t.user_id = ${userId}
                                      limit 5`;

            return pgContext.query(fetchCompaniesQuery)
                    .then(companies => {
                        user.rows[0].companies = companies.rows;

                        let fetchListingsQuery = `select 
                                                      l.id,
                                                      l.created_at,
                                                      l.name,
                                                      l.description
                                                  from listings l
                                                      where l.created_by = ${userId}
                                                  limit 5`;

                        return pgContext.query(fetchListingsQuery)
                                .then(createdListings => {
                                    user.rows[0].createdListings = createdListings.rows;

                                    let fetchApplications = `select 
                                                                a.id,
                                                                a.created_at,
                                                                a.cover_letter,
                                                                l.id as listing_id,
                                                                l.name as listing_name,
                                                                l.description as listing_description
                                                            from applications a
                                                                inner join listings l on l.id = a.listing_id
                                                            where a.user_id = ${userId}
                                                            limit 5`;

                                    return pgContext.query(fetchApplications)
                                            .then(applications => {
                                                let mappedApplications = [];

                                                applications.rows.map(a => { 
                                                    mappedApplications.push({
                                                        id: a.id,
                                                        created_at: a.created_at,
                                                        listing: {id: a.listing_id,name: a.listing_name, description: a.listing_description},
                                                        cover_letter: a.cover_letter
                                                    });
                                                })

                                                user.rows[0].applications = mappedApplications;
                                                return user.rows[0];
                                            });
                                });
                    });
          });
    };

    create(vm) {
        let query = `insert into users (id, created_at, name) values (
                        ${vm.id},
                        NOW(),
                        '${vm.name}'
                    )`;

        return pgContext.query(query);
    };
}

export default UserBusiness;