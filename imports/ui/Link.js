import React from 'react';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';




export default () => {
    return(

        <div>

            <PrivateHeader title="Your Links Dashboard"/>
                <div className="page-content">
                    <LinksListFilters/>
                    <AddLink/>
                    <LinksList/>

                </div>

        </div>
    );


};



//setup max width
//set margin to auto on sides.
//padding equals to our space value.

