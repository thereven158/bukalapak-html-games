var BUILD_TYPE = window.BUILD_TYPE;
var URL_TYPE = window.URL_TYPE;

if (BUILD_TYPE == null || BUILD_TYPE == undefined)
{
	BUILD_TYPE = 0;
}

if (URL_TYPE == null || URL_TYPE == undefined)
{
	URL_TYPE = 0;
}

const CONFIG = {
	TIME_LIMIT : 90,
	ROUND_TO_WIN : 3,
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
	CONFIG.VOUCHER_CODE = "CASHBACK99"
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet Voucher Cashback 99% buat belanja di Aplikasi Bukalapak!";
}

if (URL_TYPE == 0)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/MatchCardHomepage";
}
else if (URL_TYPE == 1)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/MatchCardPDP";
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
else if (CONFIG.VOUCHER_CODE == "CASHBACK99")
{
	voucherInfo.TITLE = "Voucher cashback untuk pengguna baru";
	voucherInfo.DESCRIPTION = "Promo di Bukalapak udah pasti paling hemat, belanja berapapun kamu bisa dapetin cashback!";
	voucherInfo.MASA_BERLAKU = "19 September - 30 November 2019";
	voucherInfo.MINIMUM_BERLAKU = "Tanpa Minimum Transaksi";
	voucherInfo.BERLAKU_DI = "Android App dan iOS App";
	voucherInfo.SK = "Pengguna akan mendapatkan cashback 99% (maksimum cashback berupa Credits Rp10.000) tanpa min. transaksi. Voucher ini khusus untuk pengguna baru dan bisa digunakan 1 kali.";	
}



