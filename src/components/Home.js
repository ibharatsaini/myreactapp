import React, { useEffect } from 'react'
import './home.css'
import { utils,ethers, Signer } from 'ethers'
import NFTabi from '../NFTabi.json'

export default function Home(){
    let accounts;
    const contractAdd = "0x308897fe4b42fc4f01899eb2f64334f1cdf3af2c"

    async function connectAccount(){
    if(window.ethereum){
       accounts= await window.ethereum.request({method:"eth_requestAccounts"})
        
        // console.log(accounts[0])
    }
    
    }
    useEffect(()=>{
        connectAccount()
    },[])
    async function clickEvent(e){
        e.preventDefault()
        if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(utils.getAddress(contractAdd),NFTabi.abi,signer)
        try{
            console.log("inside")
            const response = await contract.mintNft(utils.getAddress(accounts[0]),"https://gateway.pinata.cloud/ipfs/QmaXV7A6EZ32pccTGAc7cQSKtbfATq6RXzGAR7pyn17Dzo",{
                gasLimit:500000,
                gasPrice:utils.parseUnits('50.0','gwei'),
                chainId: 4
            })
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }
    }
    return(
        <div className='home'> 
            <div className="container">
                <section>Mint NFT</section>
                <div className='imgClass'>
                    <img src="/scenery.jpg"></img>
                </div>
                <span>Name : NFT test token</span>
                <div className='but' onClick={clickEvent}>Click to Mint</div>
            </div>
             {/* <button onClick={clickEvent}/>
            THis is home */}
        </div>
    )
}