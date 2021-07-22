const assert = require("chai").assert;
const eligibilityService = require("../constants").eligibilityService;
const rewardsService = require("../redeemService").rewardsService;

const customerOne = {
  customerAccountNumber: 1234567891,
  portfolio: ["MOVIES", "KIDS", "NEWS", "SPORTS"],
  eligibilityService,
};

const customerOneA = {
  customerAccountNumber: 1234567891,
  portfolio: ["SPORTS"],
  eligibilityService,
};

const customerOneB = {
  customerAccountNumber: 1234567891,
  portfolio: ["MUSIC"],
  eligibilityService,
};

const customerOneC = {
  customerAccountNumber: 1234567891,
  portfolio: ["MOVIES"],
  eligibilityService,
};

const customerOneD = {
  customerAccountNumber: 1234567891,
  portfolio: ["KIDS", "NEWS"],
  eligibilityService,
};

const customerTwo = {
  customerAccountNumber: 1222567891,
  portfolio: [],
  eligibilityService,
};

const customerThree = {
  portfolio: ["MOVIES"],
  eligibilityService,
};

const customerFour = {
  customerAccountNumber: 12225678911231,
  portfolio: ["MOVIES"],
  eligibilityService,
};

describe("App", () => {
  describe("Check rewards", () => {
    it("Return a non empty array", () => {
      let { data } = rewardsService(customerOne);
      assert.isNotEmpty(data.rewards);
    });
  });

  describe("Check rewards", () => {
    it("Return sports reward", () => {
      let { data } = rewardsService(customerOneA);
      assert.include(data.rewards, "CHAMPIONS_LEAGUE_FINAL_TICKET");
    });
  });

  describe("Check rewards", () => {
    it("Return music reward", () => {
      let { data } = rewardsService(customerOneB);
      assert.include(data.rewards, "KARAOKE_PRO_MICROPHONE");
    });
  });

  describe("Check rewards", () => {
    it("Return movies reward", () => {
      let { data } = rewardsService(customerOneC);
      assert.include(data.rewards, "PIRATES_OF_THE_CARIBBEAN_COLLECTION");
    });
  });

  describe("Check rewards", () => {
    it("Return no applicable rewards", () => {
      let { data } = rewardsService(customerOneD);
      assert.deepEqual(data.rewards, ["N/A", "N/A"]);
    });
  });

  describe("Fail ineligible customer", () => {
    it("Returns no rewards", () => {
      let { data } = rewardsService(customerTwo);
      assert.isEmpty(data.rewards);
    });
  });

  describe("Fail technical exception", () => {
    it("Returns no rewards", () => {
      let { data } = rewardsService(customerThree);
      assert.isEmpty(data.rewards);
    });
  });

  describe("Fail invalid account number", () => {
    it("Returns no rewards and notifies the client that the account number is invalid", () => {
      let { data } = rewardsService(customerFour);
      assert.equal(data.message, "Your account number is invalid.");
    });
  });
});
