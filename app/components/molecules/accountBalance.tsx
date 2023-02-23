interface IAccountBalance {
    props: {
        ether: number;
        token: string;
    };
}

export function AccountBalance({ props }: IAccountBalance): React.ReactElement {
    const balance = props;

    return (
        <>
            <div className="text-xl m-8 p-8 text-center leading-loose">
                <p>{`Ether Balance: ${balance.ether}`}</p>
                <p>{`Token Balance: ${Math.round(Number(balance.token) * 1000) / 1000} MET`}</p>
            </div>
        </>
    );
}
