const bcrypt = require('bcrypt');


const getHash = async (str) => {
    const val = await bcrypt.hash(str, 10)
    console.log(val)
};

getHash('karthick@123')
//$2b$10$AwmVXMw74.B3SkBv/mC7MeP801t3TKBlpUDoEAfP8lDd77FsUAvqq(admin)   username:KarthickAshwin password: karthick@123


//$2b$10$GioAOZ.7iZwGVTAs0YFLXe0aaml2CxLYikBtb8uRyqndoZWgrf6Se  username:Ashwin_Karthick   password: ashwin@123
