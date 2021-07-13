import React from "react";
import styled from "styled-components";

import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <InfoBoxContainer>
      <CardContent>
        {/* Title */}
        <Title color="textSecondary">{title}</Title>

        {/* Number Of cases */}
        <Cases>{cases}</Cases>

        {/* Total */}
        <Total color="textSecondary">{total} Total</Total>
      </CardContent>
    </InfoBoxContainer>
  );
}

export default InfoBox;

const InfoBoxContainer = styled(Card)``;
const Title = styled(Typography)``;
const Cases = styled.h2``;
const Total = styled(Typography)``;
