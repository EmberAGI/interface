import React from 'react';
import styled from 'styled-components';
import AmbrosusLogo from '../../../legacy/assets/images/ambrosusLogo.png';
import UsdcLogo from '../../../legacy/assets/images/usdclogo.png';
export default function YieldFarmCardImageTextView() {
  const CardImageTextContainer = styled.div`
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  `;

  const CardImageTextRow = styled.div`
    align-items: center;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  `;

  const CardImageContainer = styled.div`
    position: relative;
    left: 0px;
    top: 0px;
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  `;

  const CardImageSquareLayout = styled.div`
    display: flex;
    color: black;
    height: 75px;
    width: 75px;
    flex-shrink: 0;
    border-radius: 0;
    overflow: hidden;
    position: relative;
    font-size: 1.25rem;
    align-items: center;
    line-height: 1;
    user-select: none;
  `;

  const CardImagePosition = styled.div`
    position: absolute;
    width: 65%;
    border: none;
    height: 65%;
    margin-left: 0;
    border-radius: 0;
    display: flex;
    overflow: hidden;
    font-size: 1.25rem;
    align-items: center;
    flex-shrink: 0;
    line-height: 1;
    user-select: none;
    justify-content: center;
  `;
  const CardImageTopLeft = styled(CardImagePosition)`
    z-index: 2;
    top: 0;
    left: 0;
    margin-left: 0;
  `;

  const CardImageBottomRight = styled(CardImagePosition)`
    z-index: 1;
    margin-left: -16px;
    bottom: 0;
    right: 0;
  `;

  const CardImage = styled.img.attrs((props: { src: string }) => ({
    src: props.src,
  }))`
    object-fit: contain;
    color: transparent;
    width: 100%;
    height: 100%;
    text-align: center;
    text-ident: 1000px;
  `;

  const CardTextContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    right: 0px;
    top: 0px;
    flex-grow: 0;
    max-width: 50%;
    flex-basis: 50%;
  `;

  const CardTextLabel = styled.p`
    text-align: right;
    color: black;
    font-size: 10px;
    font-weight: bold;
    line-height: 0px;
    margin: 0px;
  `;

  const CardText = styled.p`
    text-align: right;
    color: black;
    font-size: 14px;
    font-weight: bold;
    line-height: 0px;
  `;
  return (
    <CardImageTextContainer>
      <CardImageTextRow>
        <CardImageContainer>
          <CardImageSquareLayout>
            <CardImageTopLeft>
              <CardImage src={AmbrosusLogo} />
            </CardImageTopLeft>
            <CardImageBottomRight>
              <CardImage src={UsdcLogo} />
            </CardImageBottomRight>
          </CardImageSquareLayout>
        </CardImageContainer>
        <CardTextContainer>
          <CardTextLabel>Stake</CardTextLabel>
          <CardText>USDC-AMB LP</CardText>
          <CardTextLabel>Earn</CardTextLabel>
          <CardText>USDC- AMB LP</CardText>
        </CardTextContainer>
      </CardImageTextRow>
      <hr />
    </CardImageTextContainer>
  );
}
