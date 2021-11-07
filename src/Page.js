import React, {useState} from 'react';
import { makeStyles, styled } from '@mui/styles';
import GoogleFontLoader from 'react-google-font-loader';
import Profile from './avatar.jpg';
import picOne from './photos/pic-1.png';
import picTwo from './photos/pic-2.png';
import picThree from './photos/pic-3.png';
import picFour from './photos/pic-4.png';
import picFive from './photos/pic-5.png';
import picSix from './photos/pic-6.png';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import NFTMintClient from './blockchainUtils';
let blockchainClient = new NFTMintClient();
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[800],
    '&:hover': {
      backgroundColor: grey[500],
    },
  }));
const picList = [
    {
        part: 0,
        name: 'Pinting00',
        image: picOne
    },
    {
        part: 1,
        name: 'Pinting01',
        image: picTwo
    },
    {
        part: 2,
        name: 'Pinting02',
        image: picThree
    },
    {
        part: 3,
        name: 'Pinting03',
        image: picFour
    },
    {
        part: 4,
        name: 'Pinting04',
        image: picFive
    },
    {
        part: 5,
        name: 'Pinting05',
        image: picSix
    },
];
const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '100px'
        // backgroundColor: '#E5E5E5'
    },
    header: {
        width: '70%',
        marginTop: '5%'
    },
    connectButton: {
        textAlign: 'right',
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '24px',
        lineHeight: '36px',
        /* identical to box height */

        textDecorationLine: 'underline',

        /* Gray 1 */

        color: '#333333',
        cursor: "pointer"

    },
    connectedAddress: {
        textAlign: 'right',
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '36px',
        /* identical to box height */

        textDecorationLine: 'underline',

        /* Gray 1 */

        color: '#333333',
        cursor: "pointer"
    },
    info: {
        width: '70%',
        // marginTop: '5%',
        display: 'flex',
        flexDirection: 'row'
    },
    creatorName: {
        marginLeft: '48px',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    nameText: {
        fontFamily: 'Poppins',
        fontWeight: 600,
        fontSize: '36px',
        lineHeight: '27px',
        color: '#333333'
    },
    mintInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '96px',
        // justifyContent: 'flex-end'
    },
    mintLabel: {
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '36px',
        color: '#4F4F4F',
        alignSelf: 'flex-end'

    },
    mintText: {
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        fontSize: '36px',
        lineHeight: '36px',
        color: '#333333',
        alignSelf: 'flex-end',
        marginLeft: '16px',
        marginRight: '48px'
    },
    collage: {
        marginTop: '70px',
        width: '70%',
        display: "grid", 
        gridTemplateColumns: "repeat(3, 2fr)", 
        gridGap: 2,
    },
    picContainer: {
        width: '335px',
        height: '253px',
    }, 
    pic: {
        width: '100%'
    },
    button: {
        position: 'absolute',
        top: '50px',
        left: '200px',
        width: '115px',
        // borderRadius: 50
    }
});

function Page () {
    const classes = useStyles();
    var ethereum = window.ethereum;
    const [address, setAddress] = useState('');
    const [network, setNetwork] = useState('');
    const [connected, setConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState("")

    const getAccount = async() => {
        const networkNameLookup = {
            '0x1': 'mainnet',
            '0x3': 'ropsten',
            '0x4': 'rinkeby',
            '0x5': 'goerli',
            '0x2a': 'kovan',
        };
        // console.log(ethereum);
        // console.log(ethereum.isConnected());
        if (!!ethereum&&ethereum.isConnected()&&!!address ==false) {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0];
                // getCustomTokenBalance(address)
                // getAirdropAmount(address)
                //let address = window.web3.eth.accounts[0] ? window.web3.eth.accounts[0].toLowerCase() : null;
                let networkId = await ethereum.request({ method: 'eth_chainId' });
                let networkName = networkNameLookup[networkId] || `unknown(${networkId})`;
                let ethBalance = await ethereum.request({ method: 'eth_getBalance', params: [
                    address,
                    'latest'
                ] });
                let result = parseInt(ethBalance, 16)
                let balance = (result/1e18).toFixed(2)
                console.log(balance)
                console.log({Address: address, netWorkId:networkId, network: networkName, ethBalance: balance})
                setConnected(true)
                setAddress(address)
                setNetwork(network)
                setEthBalance(balance)
            // Acccounts now exposed
            } catch (error) {
            // User denied account access...
            }
        }
        // Non-dapp browsers...
        else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }  
    }
    // const maskAddress = (address) => {
    //     const firstDigits = address.substring(0, 8);
    //     const lastDigits = address.substring(address.length - 7);

    //     var requiredMask = 'x'.repeat(address.length - firstDigits.length - lastDigits.length);
    //     console.log(address.length)
    //     console.log(firstDigits.length)
    //     console.log(lastDigits.length)
    //     var maskedString = firstDigits + requiredMask + lastDigits;
    //     console.log(maskedString)
    //     return maskedString;
    // }
    const mintToken = async (paintId) => {
        console.log(address)
        let mint = await blockchainClient.mintToken(address, paintId)
        if(mint){
            alert("You successfully minted an NFT!")
        }
        else {
            alert("Something went wrong")
        }
    }
    return(
        <>
            <GoogleFontLoader
                fonts={[
                    {
                    font: 'Poppins',
                    weights: [400, 500],
                    }
                ]}
            />
            <div className={classes.root}>
                <div className={classes.header}>
                    {connected? 
                    <div className={classes.connectedAddress}>{address}</div>
                    :<div className={classes.connectButton} onClick={() => getAccount()}>Connect to Wallet</div>}
                </div> 
                <div className={classes.info}>
                    {/* <Avatar alt="Creator Profile pic" src="./avatar.jpg" /> */}
                    <img src={Profile} style={{height: '15vmin', width: '15vmin', borderRadius: '7.5vmin'}} alt="Creator Profile pic" />
                    <div className={classes.creatorName}>
                        <div className={classes.nameText}>
                            Jannica
                        </div>
                        <div className={classes.nameText}>
                            Zhang
                        </div>
                    </div>
                    <div className={classes.mintInfo}>
                        <div className={classes.mintLabel}>
                            Creations
                        </div>
                        <div className={classes.mintText}>
                            6
                        </div>
                        <div className={classes.mintLabel}>
                            Minted
                        </div>
                        <div className={classes.mintText}>
                            2
                        </div>
                    </div>
                </div> 
                <div className={classes.collage}>
                    {picList.map(pic => (
                        <div key={pic.part} className={classes.picContainer}>
                            <ColorButton size='small' variant="contained" className={classes.button} style={{ borderRadius: 25 }} onClick={() => mintToken(pic.part)} disabled={!address}>Mint</ColorButton>
                            <img src={pic.image} className={classes.pic} alt={pic.name} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Page;