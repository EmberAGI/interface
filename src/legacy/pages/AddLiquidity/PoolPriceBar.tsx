import { Currency, Percent, Price } from '@firepotfinance/firepotfinance-sdk';
import React, { useContext } from 'react';
import { Text } from 'rebass';
import { ThemeContext } from 'styled-components';
import { AutoColumn } from '../../components/Column';
import { AutoRow } from '../../components/Row';
import { ONE_BIPS } from '../../constants';
import { Field } from '../../state/mint/actions';
import { TYPE } from '../../theme';

export function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency };
  noLiquidity?: boolean;
  poolTokenPercentage?: Percent;
  price?: Price;
}) {
  const theme = useContext(ThemeContext);
  return (
    <AutoColumn style={{marginBottom: 32}}>
        <AutoRow style={{marginTop: 16}} justify="space-between">
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            {currencies[Field.CURRENCY_B]?.symbol} per {currencies[Field.CURRENCY_A]?.symbol}
          </Text>
          <TYPE.black fontSize={14}>{price?.toSignificant(6) ?? '-'}</TYPE.black>
        </AutoRow>
        <AutoRow style={{marginTop: 16}} justify="space-between">
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            {currencies[Field.CURRENCY_A]?.symbol} per {currencies[Field.CURRENCY_B]?.symbol}
          </Text>
          <TYPE.black fontSize={14}>{price?.invert()?.toSignificant(6) ?? '-'}</TYPE.black>
        </AutoRow>
        <AutoRow style={{marginTop: 16}} justify="space-between">
          <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
            Share of Pool
          </Text>
          <TYPE.black fontSize={14}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </TYPE.black>
        </AutoRow>
    </AutoColumn>
  );
}
