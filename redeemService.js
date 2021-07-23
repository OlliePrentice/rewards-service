/**
 * Gets relevant customer rewards
 *
 * @param {number} param
 * @returns array of results
 */
function rewardsService({
    customerAccountNumber,
    portfolio,
    eligibilityService,
}) {
    let result = { rewards: [], message: "" };

    try {
        const eligibility = eligibilityService(customerAccountNumber);

        if (eligibility === "CUSTOMER_ELIGIBLE") {
            portfolio.forEach((subscription) => {
                switch (subscription) {
                    case "SPORTS":
                        result.rewards.push("CHAMPIONS_LEAGUE_FINAL_TICKET");
                        break;
                    case "MUSIC":
                        result.rewards.push("KARAOKE_PRO_MICROPHONE");
                        break;
                    case "MOVIES":
                        result.rewards.push(
                            "PIRATES_OF_THE_CARIBBEAN_COLLECTION"
                        );
                        break;
                    default:
                        result.rewards.push("N/A");
                }
            });
        }
    } catch (err) {
        if (err === "Invalid account number exception") {
            result.message = "Your account number is invalid.";
        }
    }

    return {
        data: result,
    };
}

exports.rewardsService = rewardsService;
