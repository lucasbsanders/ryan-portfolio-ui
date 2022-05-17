import { TestBed } from '@angular/core/testing';

import { AwsConnectService } from './aws-connect.service';

describe('AwsConnectService', () => {
  let service: AwsConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly convert to and from dynamo typed values', () => {
    const obj = {
      Text: 'ABC',
      Num: 456,
      Arr: ['g', 'h', 'i'],
      NumArr: [4, 5, 6],
      IsYes: true,
      ComplexObj: {
        Text: 'ABC',
        Num: 456,
        Arr: ['g', 'h', 'i'],
      },
    }
    expect('abc').toBe(service.parseTypedObj(service.createTypedObj('abc')));
    expect(123).toBe(service.parseTypedObj(service.createTypedObj(123)));
    expect(JSON.stringify(['a', 'b', 'c'])).toBe(JSON.stringify(service.parseTypedObj(service.createTypedObj(['a', 'b', 'c']))));
    expect(JSON.stringify([1, 2, 3])).toBe(JSON.stringify(service.parseTypedObj(service.createTypedObj([1, 2, 3]))));
    expect(service.parseTypedObj(service.createTypedObj(true))).toBeTrue();
    expect(service.parseTypedObj(service.createTypedObj(false))).toBeFalse();
    expect(JSON.stringify(obj)).toBe(JSON.stringify(service.parseTypedObj(service.createTypedObj(obj))));
    expect(JSON.stringify([obj, obj])).toBe(JSON.stringify(service.parseTypedObj(service.createTypedObj([obj, obj]))));
  });
});
