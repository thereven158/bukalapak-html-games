var IS_DEBUG = false; // default: false
var IS_404_BYPASS = true; // default: false
var IS_TRACKER_ON = false; // default: true
var DEV_MODE = false;
var AssetUrl = "../assets/";

//var IS_QUIZ_BACKEND = false; // default: true

//var IS_TOKEN_DEBUG = false; // default: false
//var IS_SKIP_TOKEN_CHECK = true; // default: false

var MINIMUM_BLOCK_TOLERANCE_RATIO = 0.05;

var BUILD_TYPE = window.BUILD_TYPE;
var URL_TYPE = window.URL_TYPE;

var AssetUrl = "assets/"

/////////////////////////////////////////////////////////////////

if (BUILD_TYPE == null || BUILD_TYPE == undefined)
{
	BUILD_TYPE = 0;
}

if (URL_TYPE == null || URL_TYPE == undefined)
{
	URL_TYPE = 0;
}

const CONFIG = {
	TIME_LIMIT : 90000,
	GOAL_TARGET : 10,
	IS_INSTANT_WIN: false,
	
	URL_DOWNLOAD : "",
	VOUCHER_CODE : "",
	TITLE_TEXT : "",
	DESC_TEXT : "",
	
	VOUCHER_INFO : {
		TITLE:"",
		DESCRIPTION: "",
		MASA_BERLAKU: "",
		MINIMUM_BERLAKU: "",
		BERLAKU_DI: "",
		SK: ""
	}
}

if (BUILD_TYPE == 0)
{
	CONFIG.VOUCHER_CODE = "TANPAONGKIR"
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet voucher gratis ongkir sampai Rp20.000 buat belanja di aplikasi Bukalapak!";
}
else if (BUILD_TYPE == 1)
{
	CONFIG.VOUCHER_CODE = "CASHBACK20K"
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet Voucher Cashback Rp20.000 buat beli pulsa, tiket, atau bayar tagihan di Aplikasi Bukalapak!";
}

if (URL_TYPE == 0)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/GalaxyTowerHomepage";
}
else if (URL_TYPE == 1)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/GalaxyTowerPDP";
}

let voucherInfo = CONFIG.VOUCHER_INFO;

if (CONFIG.VOUCHER_CODE == "TANPAONGKIR")
{
	voucherInfo.TITLE = "Voucher gratis ongkir untuk pengguna baru";
	voucherInfo.DESCRIPTION = "Promo di Bukalapak udah pasti paling hemat, belanja berapapun kamu bisa dapetin gratis ongkir!";
	voucherInfo.MASA_BERLAKU = "9 September - 30 November 2019";
	voucherInfo.MINIMUM_BERLAKU = "Tanpa Minimum Transaksi";
	voucherInfo.BERLAKU_DI = "Android App dan iOS App";
	voucherInfo.SK = "Pengguna akan mendapatkan diskon ongkir hingga Rp20.000 untuk semua jenis pengiriman kecuali Gojek. Voucher ini khusus untuk pengguna baru dan bisa digunakan 1 kali.";
}
else if (CONFIG.VOUCHER_CODE == "CASHBACK20K")
{
	voucherInfo.TITLE = "Voucher cashback untuk pengguna baru";
	voucherInfo.DESCRIPTION = "Promo di Bukalapak udah pasti paling hemat, belanja berapapun kamu bisa dapetin cashback!";
	voucherInfo.MASA_BERLAKU = "19 September - 30 November 2019";
	voucherInfo.MINIMUM_BERLAKU = "Tanpa Minimum Transaksi";
	voucherInfo.BERLAKU_DI = "Android App dan iOS App";
	voucherInfo.SK = "Pengguna akan mendapatkan cashback 3% (maksimum cashback berupa Credits Rp20.000) tanpa min. transaksi. Voucher ini khusus untuk pengguna baru dan bisa digunakan 1 kali.";	
}



