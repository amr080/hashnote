import "../IERC20.sol";
interface ITeller {
    function buy(uint256 _amount) external returns (uint256);
    function sell(uint256 _amount) external returns (uint256);
}

ITeller teller = ITeller(0x0a5ea26fdd38cf2acb06dc64198374c337879dab);

// Buying USYC
IERC20 pyusd = IERC20(0x6c3ea9036406852006290770BEdFcAbA0e23A0e8);
uint256 paying = 100 * 1e6; // 100.000000 PYUSD
pyusd.approve(address(teller), paying); // approving teller to spend 100 PYUSD
uint256 usycPurchased = teller.buy(paying);

// Selling USYC
IERC20 usyc = IERC20(0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b);
uint256 selling = 100 * 1e6; // 100.000000 USYC
usyc.approve(address(teller), selling); // approving teller to spend 100 USYC
uint256 usdcPayout = teller.sell(selling)
