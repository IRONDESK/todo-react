import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const {id} = useParams();
    console.log(id)
    return (<div>detail</div>);
}

export default Detail;