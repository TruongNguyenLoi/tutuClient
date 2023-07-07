export const CALLBACK_URL_GOOGLE = "https://a4ad-123-24-233-164.ngrok.io/oauth2/facebook"
export const CALLBACK_URL_FACEBOOK = "https://a4ad-123-24-233-164.ngrok.io/oauth2/facebook"
export const CALLBACK_URL_ZALO = "https://7f26-123-24-233-164.ngrok.io/oauth2/zalo"
export const LOGIN_URL_GOOGLE = `https://accounts.google.com/o/oauth2/auth?scope=email%20profile&redirect_uri=http://localhost:8080/oauth2/google&response_type=code&client_id=4324503554-bt9sjojk5ml20lo40oq7tau8uni5pp5c.apps.googleusercontent.com&approval_prompt=force`;
export const LOGIN_URL_FACEBOOK = `https://www.facebook.com/dialog/oauth?client_id=677457713240896&redirect_uri=${CALLBACK_URL_FACEBOOK}&scope=email,public_profile&display=page`;
export const LOGIN_URL_ZALO = `https://oauth.zaloapp.com/v4/permission?app_id=2004406068292141065&redirect_uri=${CALLBACK_URL_ZALO}&state=vi`;