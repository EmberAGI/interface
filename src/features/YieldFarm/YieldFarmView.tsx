import React from 'react';
import AppBody from '../../legacy/pages/AppBody';
import { Text } from 'rebass';
import AmbrosusLogo from '../../legacy/assets/images/ambrosusLogo.png';
import usdclogo from '../../legacy/assets/images/usdclogo.png';
import styled from 'styled-components';
import { ButtonPrimary } from 'legacy/components/Button';
import { TYPE } from 'legacy/theme';
import { SwapPoolTabs } from 'legacy/components/NavigationTabs';

export default function YieldFarmView() {
  const PageWrapper = styled.div`
    padding: 12px 1rem 0px 1.5rem;
    margin-bottom: 0.4rem;
    width: 100%;
    color: ${({ theme }) => theme.text2};
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const TitleRow = styled.div`
    padding: 12px 1rem 0px 1.5rem;
    margin-bottom: 0.4rem;
  `;
  const CardContainer = styled.div`
    display: flex;
    padding: 30px;
    overflow: hidden;
    box-shadow: 10px 22px 33px 0px rgb(0 0 0 / 90%);
    border-radius: 15px;
    flex-direction: column;
    backdrop-filter: blur(10px);
    background-color: rgb(255, 255, 255);
    width: 80%;
  `;

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

  const CardImageTopLeft = styled.div`
    z-index: 2;
    top: 0;
    left: 0;
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

  const CardImageBottomRight = styled.div`
    z-index: 1;
    margin-left: -16px;
    bottom: 0;
    right: 0;
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

  const CardImage = styled.img.attrs((props) => ({
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

  const CardSpaceBetweenRow = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
  `;

  const CardCenterRow = styled.div`
    display: flex;
    justify-content: center;
    height: 40px;
  `;

  const ResponsiveButtonPrimary = styled(ButtonPrimary)`
    width: fit-content;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
  `;

  return (
    <AppBody>
      <SwapPoolTabs active={'farm'} />
      <TitleRow>
        <TYPE.black fontWeight={500}>Farm</TYPE.black>
      </TitleRow>
      <PageWrapper>
        <CardContainer>
          <CardImageTextContainer>
            <CardImageTextRow>
              <CardImageContainer>
                <CardImageSquareLayout>
                  <CardImageTopLeft>
                    <CardImage src={AmbrosusLogo} />
                  </CardImageTopLeft>
                  <CardImageBottomRight>
                    <CardImage src={usdclogo} />
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
          <CardSpaceBetweenRow>
            <CardText>APR</CardText>
            <CardText>69</CardText>
          </CardSpaceBetweenRow>
          <CardSpaceBetweenRow>
            <CardText>Daily ROI</CardText>
            <CardText>69%</CardText>
          </CardSpaceBetweenRow>
          <CardSpaceBetweenRow>
            <CardText>TVL</CardText>
            <CardText>69</CardText>
          </CardSpaceBetweenRow>
          <CardCenterRow>
            <ResponsiveButtonPrimary padding="6px 10px">
              <Text>Manage</Text>
            </ResponsiveButtonPrimary>
          </CardCenterRow>
        </CardContainer>
      </PageWrapper>
    </AppBody>
  );
}
