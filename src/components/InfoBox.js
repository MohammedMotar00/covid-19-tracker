import React from "react";
import styled from "styled-components";

import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <InfoBoxContainer
      onClick={props.onClick}
      style={{
        borderTop: active
          ? `10px solid ${isRed ? "red" : "greenyellow"}`
          : null,
      }}
    >
      <CardContent>
        {/* Title */}
        <Title color="textSecondary">{title}</Title>

        {/* Number Of cases */}
        <Cases style={{ color: !isRed && "lightgreen" }}>{cases}</Cases>

        {/* Total */}
        <Total color="textSecondary">{total} Total</Total>
      </CardContent>
    </InfoBoxContainer>
  );
}

export default InfoBox;

const InfoBoxContainer = styled(Card)`
  flex: 1;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 15px;
  }
`;

const Title = styled(Typography)``;

const Cases = styled.h2`
  color: #cc1034;
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
`;

const Total = styled(Typography)`
  color: "#6c757d" !important;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  margin-top: 15px !important;
`;
