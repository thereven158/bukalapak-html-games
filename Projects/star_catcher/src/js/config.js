var BUILD_TYPE = window.BUILD_TYPE;
var URL_TYPE = window.URL_TYPE;

var AssetUrl = "assets/"
	

if (BUILD_TYPE == null || BUILD_TYPE == undefined)
{
	BUILD_TYPE = 0;
}

if (URL_TYPE == null || URL_TYPE == undefined)
{
	URL_TYPE = 0;
}

const CONFIG = {
	MAX_LIVES:3,
	TARGET_STAR: 10,	
	TIME_LIMIT : 30000,
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
	CONFIG.VOUCHER_CODE = "PULSA1RP"
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet Voucher Pulsa 10.000 seharga Rp1 buat beli di Aplikasi Bukalapak!";
}

if (URL_TYPE == 0)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/StarCatcherHomepage";
}
else if (URL_TYPE == 1)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/StarCatcherPDP";
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
else if (CONFIG.VOUCHER_CODE == "PULSA1RP")
{
	voucherInfo.TITLE = "Voucher diskon untuk pengguna baru";
	voucherInfo.DESCRIPTION = "Promo di Bukalapak udah pasti paling hemat, belanja pulsa Rp10.000 cuma bayar Rp1!";
	voucherInfo.MASA_BERLAKU = "19 September - 30 November 2019";
	voucherInfo.MINIMUM_BERLAKU = "Rp10.000";
	voucherInfo.BERLAKU_DI = "Android App dan iOS App";
	voucherInfo.SK = "Pengguna akan mendapatkan diskon Rp9.999 untuk pembelian pulsa sebesar Rp10.000. Voucher ini khusus untuk pengguna baru dan bisa digunakan 1 kali.";	
}
