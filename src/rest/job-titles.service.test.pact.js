import JobTitlesService from "./job-titles.service";
import * as Pact from "@pact-foundation/pact";

describe("JobTitles API", () => {
  const jobTitlesService = new JobTitlesService(
    "http://localhost",
    global.port
  );

  // a matcher for the content type "application/json" in UTF8 charset
  // that ignores the spaces between the ";2 and "charset"
  const contentTypeJsonMatcher = Pact.Matchers.term({
    matcher: "application\\/json; *charset=utf-8",
    generate: "application/json; charset=utf-8"
  });

  describe("getJobTitles()", () => {
    beforeEach(done => {
      global.provider
        .addInteraction({
          uponReceiving: "a GET request for job titles",
          withRequest: {
            method: "GET",
            path: "/ats/api/job_titles",
            headers: {
              Accept: contentTypeJsonMatcher
            }
          },
          state: `job descriptions exist`,
          willRespondWith: {
            status: 200,
            headers: {
              "Content-Type": contentTypeJsonMatcher
            },
            body: Pact.Matchers.somethingLike({
              data: Pact.Matchers.eachLike({
                id: Pact.Matchers.somethingLike("972311621"),
                type: "job_title",
                attributes: {
                  name: Pact.Matchers.somethingLike("Area Manager")
                },
                meta: {}
              }),
              meta: {
                ctx: Pact.Matchers.somethingLike(
                  "37394d02-f2fd-47e6-a866-7ec36f22494b"
                )
              }
            })
          }
        })
        .then(() => done());
    });

    it("sends a request according to contract", (done, fail) => {
      jobTitlesService
        .getJobTitles()
        .then(response => {
          expect(response.data[0]["id"]).toEqual("972311621");
          expect(response.data[0]["type"]).toEqual("job_title");
          expect(response.data[0]["attributes"]).toEqual({
            name: "Area Manager"
          });
          expect(response.data[0]["meta"]).toEqual({});
          expect(response.meta["ctx"]).toEqual(
            "37394d02-f2fd-47e6-a866-7ec36f22494b"
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
