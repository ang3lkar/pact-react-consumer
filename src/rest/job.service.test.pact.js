import JobService from './job.service';
import * as Pact from '@pact-foundation/pact';

describe('Job API', () => {
  const jobService = new JobService(
    'http://localhost',
    global.port
  );

  // a matcher for the content type 'application/json' in UTF8 charset
  // that ignores the spaces between the ';2 and 'charset'
  const contentTypeJsonMatcher = Pact.Matchers.term({
    matcher: 'application\\/json; *charset=utf-8',
    generate: 'application/json; charset=utf-8'
  });

  describe('getJob(43573271)', () => {
    beforeEach(done => {
      global.provider
        .addInteraction({
          uponReceiving: 'a GET request for job with id=43573271',
          withRequest: {
            method: 'GET',
            path: '/ats/api/jobs/43573271',
            headers: {
              Accept: contentTypeJsonMatcher,
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MzAxMzg3NzQsImFjY291bnRfaWQiOjUxMTE3Njk1NywibWVtYmVyX2lkIjo1ODgzMTI3NDMsImlzc3VlciI6IldvcmthYmxlIiwiaXNzdWVkX2F0IjoiMjAxOS0wNy0yOSAwOToxODo0OCBVVEMiLCJhY2NfdWlkIjoiMGI4ZDVkZmMtNWJiMi01YWRjLTgxMWItZjU1ODMyYjA5ZmRiIiwic3ViIjoiZDZmNTdlYWEtZGE4YS01YzU5LWExYTEtOGViZTM0MDM0YjhhIn0.DYBFi9Wwcv07m8swpPuiMbopcyn59qLv4zNDjJZqBaw'
            }
          },
          state: `job with id=43573271 exists`,
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': contentTypeJsonMatcher
            },
            body: Pact.Matchers.somethingLike({
              data: Pact.Matchers.somethingLike({
                id: Pact.Matchers.somethingLike('43573271'),
                type: 'job',
                attributes: {
                  title: Pact.Matchers.somethingLike('Copilot'),
                  industry: null, // null?
                  country_code: Pact.Matchers.somethingLike('US'),
                  country_name: Pact.Matchers.somethingLike('United States'),
                  state_code: Pact.Matchers.somethingLike('CA'),
                  zip_code: null, // null?
                  city: Pact.Matchers.somethingLike('Los Angeles'),
                  subregion: Pact.Matchers.somethingLike('California'),
                  keywords: Pact.Matchers.somethingLike(['ruby']),
                  description: Pact.Matchers.somethingLike('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
                  requirements: null,
                  benefits: null
                },
                relationships: {
                  account: {
                    data: {
                      id: Pact.Matchers.somethingLike('511176957'),
                      type: 'account'
                    }
                  }
                },
                meta: {}
              }),
              meta: {
                ctx: Pact.Matchers.somethingLike(
                  '37394d02-f2fd-47e6-a866-7ec36f22494b'
                )
              }
            })
          }
        })
        .then(() => done());
    });

    it('sends a request according to contract', (done, fail) => {
      jobService
        .getJob(43573271)
        .then(response => {
          expect(response.data['id']).toEqual('43573271');
          expect(response.data['type']).toEqual('job');
          expect(response.data['attributes']).toEqual({
            title: 'Copilot',
            industry: null,
            country_code: 'US',
            country_name: 'United States',
            state_code: 'CA',
            zip_code: null,
            city: 'Los Angeles',
            subregion: 'California',
            keywords: ['ruby'],
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
            requirements: null,
            benefits: null
          });
          expect(response.data['meta']).toEqual({});
          expect(response.meta['ctx']).toEqual(
            '37394d02-f2fd-47e6-a866-7ec36f22494b'
          );
        })
        .then(() => {
          global.provider.verify().then(
            () => done(),
            error => {
              done.fail(error);
            }
          );
        });
    });
  });
});
