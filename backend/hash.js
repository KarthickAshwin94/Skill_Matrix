const bcrypt = require('bcrypt');


const getHash = async (str) => {
    const val = await bcrypt.hash(str, 10)
    console.log(val)
};

getHash('karthick@123')
//$2b$10$AwmVXMw74.B3SkBv/mC7MeP801t3TKBlpUDoEAfP8lDd77FsUAvqq(admin)   username:KarthickAshwin password: karthick@123


//$2b$10$GioAOZ.7iZwGVTAs0YFLXe0aaml2CxLYikBtb8uRyqndoZWgrf6Se  username:Ashwin_Karthick   password: ashwin@123

//new ones 
//$2b$10$sRBHJW3iXtj.cA4TlbjfwuO8ZrGNZhHC57DteS.Efhkn6b662TctK    username:Ashwin_Karthick   password: ashwin@123
// $2b$10$apHl4vJYAcOP2MqCrF3bAuoMxnYXR1mmdTKc5oeyfQB3qycvfnvq. username: Karthick_Ashwin   password: karthick@123

// $2b$10$P.vBBfkQxOKQpYa9r9hp5uk1txAzNTS9QlHXsccU61gOkud.DNPR6  usernameL Kumaresh   password: kumaresh@2003

