const serverUrl = "https://hhvop4dkdmyf.usemoralis.com:2053/server";
const appId = "cF1lmflYWjY6Dvlf1sMHUafcUWQDlFCQw7fK7DeI";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Hello World!" })
            console.log(user)
            console.log(user.get('ethAddress'))
            //balances()
            //owners()

            console.log("checking owners")
            const ownersoptions = {
                address: "0xEaeee0B3d2de266090DFb7fe6FD89182ae1b3889",
                token_id: "10",
                chain: "rinkeby",
            };

            const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(ownersoptions);
            console.log(tokenIdOwners)

            console.log("printing owner")
            console.log(tokenIdOwners.result[0].owner_of)

            /// assiged owner of the token to an array and compare it to logged in user
            const ownerAddress = tokenIdOwners.result[0].owner_of
            const ethAddress = (user.get("ethAddress"))
            console.log("printing user wallet address")
            console.log(ethAddress)
            console.log(ownerAddress === ethAddress);

            if (ethAddress === ownerAddress) {
                console.log("Matching strings!");
                $('#holder').text("welcome fren")
            }
            else {
                console.log("Strings do not match");
            }

        } catch (error) {
            console.log(error)
        }
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
};



/* async function balances() {

    const options = {
        chain: "rinkeby",
        address: "0xEc45dCf186A23247a2e1e45a67897bbbfeF09b10",
    };
    const balances = await Moralis.Web3API.account.getTokenBalances(options);
    console.log(balances)
};


/* async function owners() {
 
    console.log("checking owners")
    const ownersoptions = {
        address: "0xEaeee0B3d2de266090DFb7fe6FD89182ae1b3889",
        token_id: "10",
        chain: "rinkeby",
    };
 
    const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(ownersoptions);
 
    console.log("printing owner")
    console.log(tokenIdOwners.result[0].owner_of)
 
    /// assiged owner of the array
    const ownerAddress = tokenIdOwners.result[0].owner_of
 
}
*/
async function allOwners() {
    console.log("getting all owners")
    const alloptions = {
        address: "0xEaeee0B3d2de266090DFb7fe6FD89182ae1b3889",
        chain: "rinkeby",
    };
    const nftOwners = await Moralis.Web3API.token.getNFTOwners(alloptions);
}
allOwners()

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;