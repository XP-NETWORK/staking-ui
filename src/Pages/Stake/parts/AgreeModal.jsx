import React from 'react'
import { useDispatch } from 'react-redux'
import { setAgreementMod } from '../../../redux/counterSlice'
import "./AgreeModal.css"


export default function AgreeModal() {

    const dispatch = useDispatch()
    function handleClose() {
        dispatch(setAgreementMod(false))
    }
    return (
        <div className='agreement-modal__container'>
            <div className="agreement-modal__header">
            <div onClick={() => handleClose() } className="modal-close">&#x2715;</div>
                <div className="agreement-modal__title">Terms of use</div>
                <p>
                    The Terms of Use (the “Terms”) govern the relationship between XP Network 
                    (“XP Network” or “XP”). and you, the "Staker”. The Terms govern the staking 
                    mechanics within XP Network’s decentralized staking system, and do not apply, 
                    unless otherwise specifically mentioned, 
                    to any other services offered by XP Network. 
                </p>
                <p className='bold'>
                    IF YOU DO NOT AGREE TO ALL OF THE TERMS AND CONDITIONS LISTED IN THE TERMS, 
                    OR IF ANY OF THE REPRESENTATIONS AND WARRANTIES SET FORTH IN THE TERMS IS INACCURATE 
                    AS APPLIED TO YOU, YOU MUST NOT STAKE TOKENS WITH XP NETWORK.
                </p>
                <p>
                    The Staker represents that Staker has full legal authority to bind to the terms and 
                    risks listed in the 
                    Terms by staking tokens within XP Network.
                </p>
                <ol className='terms__list'>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Definitions</div> 
                        <div className="list__item__text">
                            Definitions used in the Terms with their initial 
                            letters capitalized have the meanings ascribed
                            to them in this section or where they are elsewhere defined in the Terms. 
                            Any term defined in the singular will have the corresponding definition in the plural 
                            (and vice versa). Staker may be referred to as “he” or “she” for simplicity reasons  only:
                         </div>
                         <ol type='a' className="list__item__list">
                             <li>“Party” means you or us, as applicable, and “Parties” means you and us collectively.</li>
                             <li>“Support Network” - means the underlying network utilized by XP Network.</li>
                             <li>“Terms” means these Terms of use and all Attachments as may be amended from time to time by XP Network, without prior notification and at its sole discretion.</li>
                             <li>“Token” means the underlying digital asset officially associated with XP Network.</li>
                             <li>“Confidential Information” means all non-public information disclosed by one Party to the other in connection with the Terms that the disclosing party marks as confidential or which the receiving Party should reasonably know to be the confidential information of the other Party.</li>
                             <li>“Effective Date” means the date that you stake your tokens with the XP Network Service.</li>
                             <li>“Staking Rewards” means tokens distributed by XP Network and accredited to the Staker in proportion to the elapsed staking period and the agreed percentage of the Annual Percentage Yield as defined and modified by XP Network at its sole discretion.</li>
                             <li>“Staking Smart Contract(s)” means self-executing contracts (computer programs) which accept Tokens for predefined periods of time and releases Staking Rewards in return and in accordance with the defined Staking Rewards release properties and limitations. Staking Smart Contracts may prevent the withdrawing of Tokens for predefined periods of time (“Lockup”).</li>
                             <li>“Staking Platform” means XP Network’s decentralized technology platform and infrastructure used to perform the Staking.</li>
                             <li>“Staking” means the transfer of Staker Tokens to the XP Network Staking Smart Contract either via the Staking Platform or directly via the Staking Smart Contract. Staking is subject to Token Lockup, as defined by XP Network.</li>
                             <li>“Staked Tokens” means the Tokens that Staker has Staked on the XP Network Staking Smart Contract.</li>
                             <li>“Website” means any website managed and maintained by XP Network in connection with Staking Platform, including but not limited to https://staking.xp.network.</li>
                             <li>“Staking System” means the Staking Smart Contracts, Staking Platform, Staking Rewards, Staked Tokens, Staking, Website, Token, Support Network and any other technology used to provide any of the above services.</li>
                         </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Responsibilities</div>
                        <ol type='a' className="list__item__list">
                            <li>
                                During the Term (as Defined below) XP Network will provide the following:
                                <ol type='i'>
                                    <li>The Service will be operated in a diligent and professional manner and in accordance with applicable industry standards.</li>
                                    <li>Reasonable security safeguards will be employed by XP Network to protect the integrity and availability of the Staking Platform.</li>
                                </ol>
                            </li>
                            <li>
                                During the Term, the Staker shall provide the following;
                                <ol type="i">
                                    <li>Staked Tokens to XP Network's staking smart contract(s).</li>
                                    <li>Tokens can be Staked or withdrawn at the Staker's discretion; however, in all cases, Staked Tokens will be subject to lockup periods.</li>
                                    <li>THE STAKER IS RESPONSIBLE FOR MAINTAINING THE SECURITY OF THEIR ACCOUNTS AND KEYS AT ALL TIMES. XP NETWORK WILL NEVER ASK FOR PRIVATE KEYS IN ANY CIRCUMSTANCE. 
                                        XP NETWORK WILL NOT HOLD THE STAKER'S PRIVATE KEYS, AND WILL NOT ACT AS A CUSTODIAN OF THE STAKER'S FUNDS.</li>
                                </ol>
                            </li>
                            <li>Staker represents that he has knowledge of blockchain technology, staking, accounts, private keys, 
                                and details of the Supported Network and Staking System. Staker further represents that he conducted his own thorough investigation of Supported Network, 
                                Token, and all other matters considered in the Terms when determining if to Stake Tokens with the Staking Service.</li>
                        </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Services and Service Level Terms</div>
                        <ol type='a' className="list__item__list">
                            <li>Payment of Staking Rewards – Stakers will receive Staking Rewards directly attributable to their Staked Tokens. 
                                The percentage and timing of such remittances are determined based on the Supported Network Protocol. 
                                Factors can include the amount of nominated stake and the length of the staking period.
                            </li>
                            <li>Transfers of Rewards – XP Network is responsible for supplying the Staking Reward tokens to the staking smart contract. 
                                The Staker is responsible for withdrawing the Staking Reward tokens at any moment of the Staker's discretion, 
                                but no sooner than the Reward amount is attributed to the Staker.
                            </li>
                        </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Risks</div>
                        <ol type="a">
                            <li>Staker understands that XP Network might rely, in whole or partly, on third parties to adopt and implement it and to continue to develop, supply, and otherwise support the Staking Services. There is no assurance or guarantee that those third parties will complete their work, carry out their obligations, or otherwise meet anyone’s needs, all of which might have a material adverse effect on the Staking Services.</li>
                            <li>Unlike bank accounts or accounts at some other financial institutions, Tokens are uninsured unless you specifically obtain private insurance to insure them. Thus, in the event of loss, there is no public insurer, such as the Federal Deposit Insurance Corporation, or private insurance arranged by Company, to offer recourse to you. Staker understands that by Staking Tokens, he undertakes a risk that the Smart Contracts may be subject to vulnerabilities or unintended bugs and Staker Tokens might be lost forever. Staker assumes all responsibility for such loss and fully indemnifies XP Network and its founders, employees, service providers and advisers against all claims and against any financial losses that may occur as a result of using the Staking System.</li>
                            <li>Hackers or other malicious groups or organizations may attempt to interfere with the Staking System in a variety of ways, including, but not limited to, malware attacks, denial of service attacks, front-end and back-end attacks, infrastructure attacks, Sybil attacks, smurfing, and spoofing. Furthermore, because the Support Network rests on open source software and Tokens are based on open-source software, there is the risk that Support Network smart contracts may contain intentional or unintentional bugs or weaknesses which may negatively affect the Staking System or result in the loss of Staker Tokens, the loss of Staker’s ability to access or control Staker’s Tokens or the loss of other funds in Staker’s account (digital wallet). In the event of such a software bug or weakness, there may be no remedy, and holders of Tokens are not guaranteed any remedy, refund, or compensation.</li>
                            <li>Staker may be unable to sell or otherwise transact in Staking Rewards at any time. Staker acknowledges, understands, and agrees that: 
                                <ol type="i">
                                    <li>Tokens may have no value;</li>
                                    <li>There is no guarantee or representation of liquidity for the Tokens;</li>
                                    <li>XP Network is not and shall not be responsible for or liable for the market value of Tokens and Staking Rewards, the transferability and/or liquidity of Tokens and Staking Rewards and the availability of any market for Tokens and Staking Rewards through third parties or otherwise.</li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Indemnification</div>
                        The Staker shall indemnify, defend and hold harmless XP Network from and against all claims, suits and actions brought against XP Network by a third party, and all resulting liabilities, damages, losses and costs awarded by a court or included as part of a final settlement (in addition to reasonable attorney’s fees and disbursements), arising from or relating to the Staker's use of the Staking Platform in a manner that breaches the terms and conditions of this Terms or violates applicable laws or regulations.
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Taxes</div>
                        <ol type="a">
                            <li>The Staker shall be responsible for payment of all taxes, fees, and surcharges, however, designated, imposed on, or based upon the use of the Staking Platform and Staking Rewards obtained by the use of Staking Platform.</li>
                            <li>Neither XP Network nor any of its agents shall provide any advice or guidance with respect to the tax obligations of the Staker. You represent and agree that you will seek advice from your own tax advisor to discuss the potential tax consequences of Staking Tokens under the Terms and the receipt of any Staking Rewards.</li>
                        </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Term & Termination</div>
                        <ol type="a">
                            <li>The Term of the Terms will begin on the date that the Staker first Stakes Tokens with XP Network and will end either upon the withdrawal of Tokens from the Staking Smart Contracts by the Staker, or after a period of 12 months from the initial Staking.</li>
                            <li>Neither Party may terminate this Terms until the end of the Term.</li>
                            <li>Any obligations and duties that by their nature extend beyond the expiration or termination of the Terms will survive the expiration or termination of the Terms, including, confidentiality obligations, warranty disclaimers, indemnification, and limitations of liability.</li>
                        </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Intellectual Property</div>
                        <p>All right, title, and interest in and to the Staking Platform and the Website, including all modifications, improvements, adaptations, enhancements, or translations made thereto, and all proprietary rights therein, shall be and remain XP Network’s sole and exclusive property.</p>
                     </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Acceptable Use</div>
                        <p>The Staker may not (a) reverse engineer, disassemble, or decompile any part of the Staking Platform. The Staker shall bear the risk of loss for, and assumes all liability arising from, any unauthorized or fraudulent usage of the Staking Platform (or any hardware or software component thereof). In addition, the Staker agrees not to (i) send or store malicious code in connection with the Staking Platform or otherwise interfere with or disrupt the performance of the Staking Platform, (ii) use manual or automated tools to scan or probe the Staking Platform in order to determine vulnerabilities, or (iii) attempt to gain access to the Staking Platform or its related systems or networks in a manner inconsistent with the permitted use of the Staking Platform. XP Network reserves the right but is not required to take any and all action it deems appropriate, including, without limitation, blocking access to geographic areas or suspending access to the Staking Platform (or any hardware or software component thereof), in order to prevent or terminate any fraud, abuse or illegal use of or activities in connection with the Staking Platform or any other breach of this section provided, however, that any such action by XP Network shall be consistent with applicable laws, rules, and regulations.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Warranties and Disclaimers</div>
                        <p>Each Party represents and warrants to the other Party that it has the requisite power and authority to enter into the Terms and to carry out all activities and transactions contemplated hereunder. XP Network warrants that XP Network will provide the Staking Platform in a professional and diligent manner and in accordance with applicable industry standards. EXCEPT AS EXPRESSLY PROVIDED HEREIN, NEITHER PARTY MAKES ANY WARRANTY OR REPRESENTATION OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, AND EACH PARTY SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. XP NETWORK SPECIFICALLY DISCLAIMS ALL LIABILITY AND OBLIGATIONS WITH RESPECT TO ANY THIRD-PARTY PROVIDERS. XP NETWORK MAKES NO REPRESENTATIONS OR WARRANTIES WITH REGARD TO THE POTENTIAL MARKET FOR THE STAKING PLATFORM.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">LIMITATION OF LIABILITY</div>
                        <p>NOTWITHSTANDING ANY OTHER PROVISION OF THE TERMS, XP NETWORK WILL NOT BE LIABLE FOR ANY INDIRECT, SPECIAL, AND / OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE TERMS. </p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Compliance With Laws</div>
                        <ol type="a">
                            <li>Each Party will comply with all federal, state and local laws and regulations applicable to it (“Laws”), and will only enter into this Terms insofar as the activity is in compliance with all applicable Laws. If during the Term of the Terms any Law becomes effective that substantially and materially alters the ability or cost of either Party to perform its obligations under this Terms in whole or part, the Party that would bear the altered cost due to the change in the Law should terminate this Terms and cease using the Staking Platform.</li>
                            <li>The Staker agrees to comply strictly with all such laws and regulations as they relate to the Staking Platform, and, to the extent consistent with the Terms, not to download, use, re-export, or transfer the Staking Rewards into or within Crimea, Cuba, Iran, North Korea, or Syria, or to the governments of these countries, or any other restricted countries, wherever located. The Staker represents that it is not identified on BIS’s Denied Persons List or OFAC’s Specially Designated Nationals List, nor will the Staker permit the use of the Tokens or Staking Rewards by any person or entity identified on such a list. The Staker further represents that it will not provide, export, re-export, or transfer the Staking Rewards other than in compliance with the foregoing restrictions.</li>
                            <li>The Staker represent and warrant that: (i) the Staker (and, if the Staker is an entity, the Staker's officers, directors, employees, and agents (collectively, the “Representatives”)) are in compliance with the Foreign Corrupt Practices Act of 1977, as amended, and any rules and regulations thereunder, and similar laws of foreign jurisdictions or other anti-money laundering obligations under the law of the Staker’s jurisdiction or otherwise applicable to Representatives; (ii) the Staker is (and, if the Staker is an entity, the Staker’s Representatives are) in compliance with anti-money laundering obligations; (iii) the Staker has not (and, if the Staker is an entity, the Staker’s Representatives have not) been convicted of, or have agreed to enter into a pretrial diversion or similar program in connection with the prosecution of, a criminal offense involving theft, dishonesty, breach of trust, money laundering, the illegal manufacture, sale, distribution of or trafficking in controlled substances, or substantially equivalent activity in a domestic, military, or foreign court.</li>
                            <li>To the extent that any governmental agency or regulatory body in any country takes any action which prevents, restricts, or otherwise limits XP Network’s ability to provide any portion of the Staking Platform functionality or Staking Rewards to the Staker, XP Network shall have no liability in connection with the provision of, or failure to provide, such functionality to the Staker, and XP Network may, at its option, (a) make a reasonable effort to relocate the Staking Platform functionality to another location, or (b) terminate the applicable Staking Platform functionality immediately and without penalty.</li>
                        </ol>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Commitments</div>
                        <p>XP Network makes no commitments or promises with respect to delivery of any future features or functions. In relation to any future features or functions, all presentations, request for proposal responses, and/or product roadmap documents, information or discussions, either prior to or following the entering into of this Terms, are for informational purposes only, and XP Network shall have no obligation to provide any future releases or upgrades or any features, enhancements or functions. Staker represents and acknowledges that no decisions are based upon commitments or promises of any future features or functions.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Notices</div>
                        <p>All notices under this Terms must be in writing and given by personal delivery, recognized national overnight courier service, or certified mail, return receipt requested with a notice copy to be delivered to: info@xp.network. XP Network address: Jenga Corp, 3 Fraser Street, DUO Tower, #05-21, Singapore189352</p>
                        <p>XP Network may change the address to which notice must be delivered by updating this section.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Changes to the Terms</div>
                        <p>XP Network may revise these Terms of the Staking Platform from time to time and will post the most current version on its website. The Terms may be changed by XP Network at any time and at its sole discretion. The Staker agrees and understands it is the Staker’s responsibility to review the Terms from time to time. By continuing to use or access the Staking Platform, the Staker agrees to be bound by the revised Terms.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Force Majeure</div>
                        <p>XP Network shall be excused from any delay or failure in performance of the Terms to the extent such delay or failure is caused by wildfire, flood, explosion, war, embargo, governmental requirement, civil or military authority, Act of God, or any other causes beyond its reasonable control. Any such delay or failure shall suspend XP Network’s obligations to perform under the Terms until the cause for the delay or failure is removed.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Severability</div>
                        <p>If any provision of this Terms shall be held to be invalid or unenforceable, the invalidity or unenforceability shall not invalidate this Terms or render this Terms unenforceable, but rather this Terms shall be deemed modified to the least extent necessary to make it enforceable, and all other provisions of this Terms will remain unaffected.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Assignment</div>
                        <p>XP Network reserves the right to assign the Terms without the prior written consent of the other Party.</p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Governing Law; Dispute Resolution</div>
                        <p>The Terms shall be interpreted, construed, and enforced in accordance with the internal laws of Singapore, without regard to its conflict of laws principles. Any dispute arising under the Terms will be subject to binding arbitration by a single arbitrator with the Singapore International Arbitration Center (SIAC), in accordance with its commercial rules. All legal costs associated with the SIAC arbitration shall be paid by the Staker. </p>
                    </li>
                    <li className='terms__list__item'>
                        <div className="list__item__tittle">Entire Terms</div>
                        <p>This Terms constitutes the entire Terms between the Parties with respect to its subject matter and supersedes all other Terms (express or implied), proposals, negotiations, representations, or communications relating to the subject matter. Both Parties acknowledge that they have not been induced to enter this Terms by any representations or promises not specifically stated in this Terms. The protections of this Terms will apply to actions of the parties performed in preparation for and anticipation of the execution of this Terms. Except as provided above (i.e., via XP Network’s amendment to these Terms from time to time and at its sole discretion).</p>
                    </li>
                </ol>
            </div>
        </div>
    )
}
