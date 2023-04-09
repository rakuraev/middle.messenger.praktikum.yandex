/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expect } from 'chai';
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import queryStringify from 'shared/lib/queryStringify';
import { HTTPTransport, HttpMethods } from './HTTPTransport';

describe('HTTPTransport', () => {
  const url = 'http://some-domen.com';
  const enpoint = '/api/endpint';

  let instance: HTTPTransport;

  let xhr: SinonFakeXMLHttpRequestStatic;

  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    instance = new HTTPTransport(url).withEndpoint(enpoint);

    xhr = sinon.useFakeXMLHttpRequest();

    //@ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    requests.length = 0;
  });

  it('should init', () => {});

  it('should create _enpoint by passed url and enpoint', () => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    expect(instance['_endpoint']).to.eq(`${url}${enpoint}`);
  });

  it('should send GET request on .get()', () => {
    instance.get();

    const [request] = requests;

    expect(request.method).to.eq(HttpMethods.Get);
  });

  it('should send POST request on .post()', () => {
    instance.post();

    const [request] = requests;

    expect(request.method).to.eq(HttpMethods.Post);
  });

  it('should send PUT request on .put()', () => {
    instance.put();

    const [request] = requests;

    expect(request.method).to.eq(HttpMethods.Put);
  });

  it('should send PATCH request on .patch()', () => {
    instance.patch();

    const [request] = requests;

    expect(request.method).to.eq(HttpMethods.Patch);
  });

  it('should send DELETE request on .delete()', () => {
    instance.delete();

    const [request] = requests;

    expect(request.method).to.eq(HttpMethods.Delete);
  });

  it('should stringify params by passed query on .get()', () => {
    const query = { foo: 'bar', baz: [1, 2, 3] };
    instance.get('', query);

    const [request] = requests;

    expect(request.url).to.eq(`${url}${enpoint}?${queryStringify(query)}`);
  });

  it('should send request body by passed data on .post()', () => {
    const data = { foo: 'bar', baz: [1, 2, 3] };

    instance.post('', data);

    const [request] = requests;

    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should send request body by passed data on .delete()', () => {
    const data = { foo: 'bar', baz: [1, 2, 3] };

    instance.delete('', data);

    const [request] = requests;

    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should send request body by passed data on .patch()', () => {
    const data = { foo: 'bar', baz: [1, 2, 3] };

    instance.patch('', data);

    const [request] = requests;

    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should send request body by passed data on .delete()', () => {
    const data = { foo: 'bar', baz: [1, 2, 3] };

    instance.delete('', data);

    const [request] = requests;

    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('should send formData in request body by .post()', () => {
    const data = new FormData();

    data.set('foo', 'bar');
    data.set('baz', JSON.stringify([1, 2, 3]));

    instance.post('', {}, data);

    const [request] = requests;

    expect(
      Object.fromEntries(
        request.requestBody as unknown as IterableIterator<[number, unknown]>
      )
    ).to.eql(Object.fromEntries(data));
  });

  it('should send formData in request body by .put()', () => {
    const data = new FormData();

    data.set('foo', 'bar');
    data.set('baz', JSON.stringify([1, 2, 3]));

    instance.put('', {}, data);

    const [request] = requests;

    expect(
      Object.fromEntries(
        request.requestBody as unknown as IterableIterator<[number, unknown]>
      )
    ).to.eql(Object.fromEntries(data));
  });

  it('should reject Promise on xhr error', async () => {
    const reason = 'missed required param';

    const getRequest = instance.get();

    const [request] = requests;
    request.respond(400, {}, JSON.stringify({ reason }));

    try {
      await getRequest;
      throw new Error('should reject, but resolve');
    } catch (e: any) {
      expect(e.status).to.eq(400);
      expect(e?.response?.reason).to.eq(reason);
    }
  });
});
