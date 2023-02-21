export function TxnButton({ data, onClick }: any): React.ReactElement {
    const btnText = data;
    return (
        <>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>
                {btnText}
            </button>
        </>
    );
}
