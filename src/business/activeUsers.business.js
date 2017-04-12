'use strict';
import * as pgContext from '../contexts/pg.context.js';

class UserBusiness {

	constructor() { }

    get(page) {
        page = !page ? 0 : page - 1;
        const pageSize = 2; // 2 itens per page

        let mainQuery = `select u.id, 
                                u.created_at,
                                u.name,
                               count(*) as count
                          from users u  
                            inner join applications a on a.user_id = u.id
                                     and a.created_at between '2017-04-06 00:00:00' and '2017-04-11 23:59:59'
                          group by
                            u.id,
                              u.created_at,
                              u.name
                          order by count desc
                          limit ${pageSize} OFFSET ${page*pageSize}`;

        return pgContext.query(mainQuery)
          .then(users => {
            let idsToFetch = [];
            users.rows.map(i => {idsToFetch.push(i.id)});
            console.log(idsToFetch.join(','));
            let listingsQuery = `select a.user_id, l.name from applications a
                                    inner join listings l on l.id = a.listing_id
                                  where a.user_id in (${idsToFetch.join(',')})
                                  order by a.user_id, a.created_at desc`;

            return pgContext.query(listingsQuery)
              .then(listings => {
                let mappedUsers = [];

                users.rows.map(u => {
                  let foundListings = [];
                  listings.rows.map(l => {
                    if(l.user_id == u.id && foundListings.length < 3)
                      foundListings.push(l.name);
                  });

                  mappedUsers.push({
                    id: u.id,
                    created_at: u.created_at,
                    name: u.name,
                    count: u.count,
                    listings: foundListings
                  });
                });

                return mappedUsers;
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