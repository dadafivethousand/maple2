import Membership from './Membership';

export default function MembershipComponent({ type }) {
    return(
<div className='Memberships'>

{type.map((membership, index)=>{
return  (   <div className='Membership'>

    <Membership index={index} cancel={membership.cancel} type={membership.type} price={membership.price} billed={membership.billed}      />
     
         
    </div>)
})}

</div>)
}