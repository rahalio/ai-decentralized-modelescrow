/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@modelescrow/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  cntId(): string;
  subId(): string;
  evlId(): string;
  escId(): string;
  stlId(): string;
  dspId(): string;
  dgtId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
