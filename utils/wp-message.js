const axios = require('axios')

const API_KEY_ID = '6584654d1b49d9072226a158';
const API_SECRET = '134ba73a1cbd4df4bbab20633a45490a';

exports.sendWhatsappOTP = async ({ name, to, otp }) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://server.gallabox.com/devapi/messages/whatsapp',
            headers: {
                'apiKey': API_KEY_ID,
                'apiSecret': API_SECRET,
                'Content-Type': 'application/json',
            },
            data: {
                "channelId": "651fa2f26e72bfe4b787df50",
                "channelType": "whatsapp",
                "recipient": {
                    "name": name,
                    "phone": "91" + to,
                },
                "whatsapp": {
                    "type": "template",
                    "templateId": "65a67258a66b4739383875ec",
                    "template": {
                        "templateName": "mzr_otp_new_clone",
                        "bodyValues": {
                            name,
                            "_otp_": otp
                        }
                    }
                }
            }
        });
        console.log("response", response);
        if (response.status === 200) {
            console.log("WhatsApp OTP sent successfully.");
            console.log("Response data:", response.data);
            // console.log("OTP sent successfully.");
        } else {
            console.error("Failed to send OTP. Status:", response.status);
        }
        // console.log("OTP sent.");
    } catch (error) {
        console.log("Error While Sending OTP", error);
    }
}