import '@babel/polyfill';
import { expect } from 'chai';
import { gettingTimeZone } from '../src';

describe('Testing the module for obtaining the time zone in the city', () => {
    it('Check different cities', async () => {
        const testQuery = ['Moscow', 'London', 'New York'];
        const returnValue = ['Europe/Moscow', 'Europe/London', 'America/New_York'];
        const allResult = await Promise.all(
                testQuery.map(city => gettingTimeZone(city))
            );
        expect(allResult).to.deep.equal(returnValue);
    });

    it('Return type check', async () => {
        const result = await gettingTimeZone('Moscow');
        expect(result).to.be.an('string');
    });
});

