const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../middleware/is-auth');

describe('Auth Middleware', function () {
    it('Should throw an error if no authorization header is present,', function () {
        const req = {
            get: function (headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated.');
    });

    it('Should throw an error if no authorization header is only one string,', function () {
        const req = {
            get: function (headerName) {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    });
    it('Should yield an error if no userId,', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer djdhkjsdnjkmsk';
            }
        };
        sinon.stub(jwt, 'verify');

        jwt.verify.returns({ userId: 'abc' })

        authMiddleware(req, {}, () => { });
        expect(req).to.have.property('userId');
        jwt.verify.restore();


    });


    it('Should throw an error if the token cannot be verified,', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    });



})

