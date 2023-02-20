export function TxnButton({ data }: any): React.ReactElement {
    const btnText = data;
    return (
        <>
            <main>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    {btnText}
                </button>
            </main>
        </>
    );
}

// * Alternative button component

// interface ButtonType {
//     data: {
//         bgColor: string;
//         text: string;
//         hoverColor: string;
//         color: string;
//         fontWeight: string;
//     };
// }

// export function Button({ data }: ButtonType): React.ReactElement {
//     const btnText = data.text;
//     const bgColor = data.bgColor;

//     return (
//         <>
//             <main>
//                 <button
//                     className={`${bgColor} hover:bg-gray-500 text-white font-bold py-2 px-4 rounded`}
//                 >
//                     {btnText}
//                 </button>
//             </main>
//         </>
//     );
// }
