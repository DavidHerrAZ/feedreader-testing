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
          expect(feed.url.length).not.toEqual(0);
        }
      });

      /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("Name are defined", function() {
        for (feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toEqual(0);
        }
      });
    });

    /* This suite tests functionality and user interactions with the
    *  menu hidden in the hamburger menu in top left of page.
    */ 
    describe("The menu", function() {
      /* ensures the menu element is hidden by default. 
         */
      it("is hidden by default", function() {
        const body = document.querySelector("body");
        expect($(body).hasClass("menu-hidden")).toBe(true);
      });

      /* ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
      it("is visible on first click. Hidden when clicked again.", function() {
        const body = document.querySelector("body");
        const menuIcon = document.querySelector(".menu-icon-link");

        // is the menu-hidden class not present on first click?
        menuIcon.click();
        expect($(body).hasClass("menu-hidden")).toBe(false);

        // is the menu-hidden class now present when clicked again?
        menuIcon.click();
        expect($(body).hasClass("menu-hidden")).toBe(true);
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
        entry = document.querySelectorAll(".feed .entry").length;

        // Check whether the feed has children
        expect(entry).toBeGreaterThan(0);
      });
    });
    /* test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
      let feedHeaders, feedOne, feedTwo;

      beforeEach(function(done) {
        // Load first feed, query headers, and store for later equality testing
        loadFeed(0, function() {
          feedOne = document.querySelector(".feed").innerHTML;

          loadFeed(1, function() {
            done();
          });
        });
      });
      
      it("changes content when a new feed is selected", function() {
        // Query feed two headers now that page is loaded and store of equality testing
        feedTwo = document.querySelector(".feed").innerHTML;

        // Expect entries of the two feeds not to be equal to one another
        expect(feedOne === feedTwo).toBe(false);
      });
    });
  })()
);
