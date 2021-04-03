import React from 'react';
import { Card } from 'react-bootstrap';
import { colors } from '../../styles/colors';

export default function NotFound() {


    return (
        <>
            <Card className="NotFoundCard">
                <Card.Body>
                    <h2 className="text-center">Page Not Found!</h2>
                </Card.Body>
            </Card>
            <style jsx>{`
                .NotFoundCard{
                    background: transparent;
                    color:  ${colors.color};
                    border-color: ${colors.color};
                }

                .forgorPassBtn{
                    border-color: ${colors.color};
                    background-color: ${colors.backgroundColor};
                    color:  ${colors.color};
                }
                .forgorPassBtn:hover{
                    background-color: #000;
                    border-color: ${colors.color};
                }

            `}</style>
        </>
    )
}
