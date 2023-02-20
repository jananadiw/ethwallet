'use client';

export function ConnectWalletButton({
    props,
    onClick,
}: any): React.ReactElement {
    const walletAddress: string = props;

    // Get Trucated wallet address
    const getTrucatedWalletAddress = (): string => {
        return walletAddress != null && walletAddress.length > 0
            ? `Connected: ${walletAddress.substring(
                  0,
                  6
              )}...${walletAddress.substring(38)}`
            : `Connect Wallet`;
    };

    return (
        <>
            <button
                className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline"
                onClick={onClick}
            >
                {getTrucatedWalletAddress()}
            </button>
        </>
    );
}
