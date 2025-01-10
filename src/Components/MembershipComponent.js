import Membership from './Membership';

export default function MembershipComponent({ type }) {
    return(
<div className='Memberships'>

{type.map((membership, index)=>{
return  (   <div key={index} className={`Membership`}>
    <Membership  free={membership.free} stripe={membership.stripe} description={membership.description} kids={membership.kids} cancel={membership.cancel} type={membership.type} price={membership.price} billed={membership.billed} promo={membership.promo}  paymentLink={membership.paymentLink}   />
    </div>)
})}

</div>)
}