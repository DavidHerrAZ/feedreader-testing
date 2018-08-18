/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toEqual(0);
      });

      /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("URL are defined", function() {
        for (feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toEqual(null);
        }
      });

      /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("Name are defined", function() {
        for (feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toEqual(null);
        }
      });
    });

    describe("The menu", function() {
      /* ensures the menu element is hidden by default. 
         */
      it("is hidden by default", function() {
        const body = document.querySelector("body").classList.value;
        expect(body).toEqual("menu-hidden");
      });

      /* ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
      it("is visible on first click. Hidden when clicked again.", function() {
        const body = document.querySelector("body");
        const menuIcon = document.querySelector(".menu-icon-link");

        menuIcon.click();
        expect(body.classList.value).toEqual("");

        menuIcon.click();
        expect(body.classList.value).toEqual("menu-hidden");
      });
    });
    /* test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      /* ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it(".feed has at least one .entry element", function() {
        feed = document.querySelector(".feed");
        entry = document.querySelector(".entry");

        expect(feed.children.length).not.toEqual(0);
        expect(entry).not.toEqual(null);
      });
    });
    /* test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
      let feedHeaders, feedOne, feedTwo;

      beforeEach(function(done) {
        loadFeed(0);
        feedHeaders = document.querySelectorAll(".entry h2");
        feedOne = Array.from(feedHeaders, entry => entry.textContent);

        loadFeed(1, done);
      });

      it("changes content when a new feed is selected", function() {
        feedHeaders = document.querySelectorAll(".entry h2");
        feedTwo = Array.from(feedHeaders, entry => entry.textContent);

        expect(feedOne.length).not.toEqual(0);
        expect(feedTwo.length).not.toEqual(0);
        expect(feedOne === feedTwo).toBe(false);
      });
    });
  })()
);
