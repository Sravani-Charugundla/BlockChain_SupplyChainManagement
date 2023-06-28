import React from 'react'
const U1req = () => {
    return (
        <div>
            <div className="container-md">

                <form className="form-floating">
                    <table className="table table-bordered table-hover" >
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">UNIT-ID</th>
                                <th scope="col">REQUEST-ID</th>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Queue Request</th>
                                <th scope="col">Unavailable</th>
                            </tr>
                        </thead>
                        <tbody id="sr">
                        </tbody>
                    </table>
                    <div style={{textAlign:'center'}}>
                        <button type="button" className="btn btn-success btn-lg btn-block" onClick="addreq()">Forward Request to other units</button>
                        <br/>
                            <br/>
                            <button type="button" className="btn btn-info btn-lg btn-block" onClick="fwdasc()">Forward to ASC</button>
                    </div>


                </form>
                    </div>
            </div>
            )
}

            export default U1req;