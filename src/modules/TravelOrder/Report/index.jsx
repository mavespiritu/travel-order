import React from 'react'
import moment from "moment";

const Report = ({record}) => {
    const {
        TO_subject
    } = record

    return (
    <>
        <h1 className="font-semibold text-xl mb-4">Preview Report</h1>
        <div className="w-full h-full my-4 p-4 rounded-sm border-gray-300 border text-sm">
            <div className="flex flex-col justify-center items-center">
                <div>Republic of the Philippines</div>
                <div><b>NATIONAL ECONOMIC AND DEVELOPMENT AUTHORITY</b></div>
                <div>Regional Office 1</div>
                <div>Guerrero Road, City of San Fernando, La Union</div>
                <div className="my-6"><b>TRAVEL ORDER NO. __________</b></div>
            </div>
            <div className="flex justify-between">
                <div>TO: Concerned Staff</div>
                <div>DATE: <u>{moment().format("MMMM DD, YYYY")}</u></div>
            </div>
            <div className="flex flex-col justify-start">
                <div className="break-words">PURPOSE: {TO_subject}</div>
                <div className="break-words">DESTINATION: {TO_subject}</div>
            </div>
        </div>
    </>
    )
}

export default Report