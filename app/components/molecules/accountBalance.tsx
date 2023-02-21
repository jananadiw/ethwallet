interface AccoutBalance {
    props: {
        ether: number;
        token: string;
    };
}

export function AccountBalance({ props }: AccoutBalance): React.ReactElement {
    const balance = props;

    return (
        <>
            <div className="text-xl m-8 p-8 text-center leading-loose">
                <p>{`Ether Balance: ${balance.ether}`}</p>
                <p>{`Token Balance: ${balance.token}`}</p>
            </div>
        </>
    );
}
