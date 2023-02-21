export const tokenABI = [
    {
        constant: true,
        inputs: [
            { name: 'token', type: 'address' },
            { name: 'walletAddress', type: 'address' },
        ],
        name: 'getBalance',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
    },
    {
        inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'transferTokens',
        outputs: [],
        type: 'function',
    },
];
