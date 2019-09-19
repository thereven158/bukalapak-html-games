var BUILD_TYPE = 0;

const CONFIG = {
	TIME_LIMIT : 90,
	ROUND_TO_WIN : 1,
	IS_INSTANT_WIN: false,
	
	URL_DOWNLOAD : "",
	VOUCHER_CODE : "",
	TITLE_TEXT : "",
	DESC_TEXT : ""
}

if (BUILD_TYPE == 0)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/MatchCardHomepage";
	CONFIG.VOUCHER_CODE = "TANPAONGKIR";
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet voucher gratis ongkir sampai Rp20.000 buat belanja di aplikasi Bukalapak!";
}
else if (BUILD_TYPE == 1)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/MatchCardPDP";
	CONFIG.VOUCHER_CODE = "CASHBACK99";
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet Voucher Cashback 99% buat belanja di Aplikasi Bukalapak!";
}
else if (BUILD_TYPE == 2)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/MatchCardHomepage";
	CONFIG.VOUCHER_CODE = "CASHBACK99";
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet Voucher Cashback 99% buat belanja di Aplikasi Bukalapak!";	
} 
else if (BUILD_TYPE == 3)
{
	CONFIG.URL_DOWNLOAD = "https://bl.app.link/MatchCardPDP";
	CONFIG.VOUCHER_CODE = "TANPAONGKIR";
	CONFIG.TITLE_TEXT = "Yuk, pakai vouchernya!";
	CONFIG.DESC_TEXT = "Kamu dapet voucher gratis ongkir sampai Rp20.000 buat belanja di aplikasi Bukalapak!";
}