const path = require("path");
const fs = require("fs");
const { CourierClient } = require("@trycourier/courier");

const config = require("../configs/config");
const COMMON = require("../constants/common");

const courier = CourierClient({
  authorizationToken: config.courierApiKey,
});

exports.sendEmail = async (email, name, rewardType) => {
  try {
    const filePath = path.join(__dirname, `../utils/assets/${rewardType}.pdf`);
    const pdf = fs.readFileSync(filePath);
    const base64pdf = Buffer.from(pdf).toString("base64");
    const attachment = {
      filename: "certificate.pdf",
      contentType: "application/pdf",
      data: base64pdf,
    };
    let rewardMsg = "";
    if (rewardType === COMMON.EMP_OF_DAY) rewardMsg = "Employee of The Day";
    if (rewardType === COMMON.EMP_OF_WEEK) rewardMsg = "Employee of The Week";
    if (rewardType === COMMON.EMP_OF_MONTH) rewardMsg = "Employee of The Month";

    const { messageId } = await courier.send({
      eventId: config.courierNotificationId,
      recipientId: COMMON.COURIER_RECIPIENT_ID,
      profile: {
        email,
      },
      data: {
        name,
        rewardMsg,
      },
      override: {
        "aws-ses": {
          attachments: [attachment],
        },
      },
    });

    fs.unlink(filePath, err =>{
      if(err) throw err;
    })
  } catch (error) {
    throw error;
  }
};