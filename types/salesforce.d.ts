export const SALESFORCE_VERSION = 1;
export interface SignedRequest {
  readonly context: Context;
  readonly client: Client;
  readonly algorithm: string;
  readonly userId: string;
  readonly issuedAt: string | null;
}

export interface Context {
  readonly application?: Application | undefined;
  readonly user?: User | undefined;
  readonly environment: Environment;
  readonly organization?: Organization | undefined;
  readonly links: Links;
}
export interface Links {
  readonly chatterFeedItemsUrl: string;
  readonly chatterFeedsUrl: string;
  readonly chatterGroupsUrl: string;
  readonly chatterUsersUrl: string;
  readonly enterpriseUrl: string;
  readonly loginUrl: string;
  readonly metadataUrl: string;
  readonly partnerUrl: string;
  readonly queryUrl: string;
  readonly restUrl: string;
  readonly recentItemsUrl: string;
  readonly searchUrl: string;
  readonly sobjectUrl: string;
  readonly userUrl: string;
}
export interface Organization {
  readonly currencyIsoCode: string;
  readonly multicurrencyEnabled: boolean;
  readonly name: string;
  readonly namespacePrefix: string;
  readonly organizationId: string;
}

export interface Environment {
  readonly parameters: {
    recordData?: {
      rosdealregai__Opportunity__c: string; // Adjust the type as needed
      // Add other known fields here
    };
  };
  readonly dimensions: EnvironmentDimensions;
  readonly record?: EnvironmentRecord | undefined;
  readonly displayLocation: EnvironmentDisplayLocation;
  readonly locationUrl: string;
  readonly subLocation: EnvironmentDisplaySubLocation | null;
  readonly uiTheme: string;
  readonly version: EnvironmentVersion;
}

export interface EnvironmentRecord {
  readonly attributes: EnvironmentRecordAttributes;
  readonly Id: string;
  [key: string]: unknown;
}

export interface EnvironmentRecordAttributes {
  readonly type: string;
  readonly url: string;
}

export interface EnvironmentVersion {
  readonly api: string;
  readonly season: string;
}

export enum EnvironmentDisplayLocation {
  CHATTER = 'Chatter',
  CHATTER_FEED = 'ChatterFeed',
  MOBILE_NAV = 'MobileNav',
  OPEN_CTI = 'OpenCTI',
  PAGE_LAYOUT = 'PageLayout',
  PUBLISHER = 'Publisher',
  SERVICE_DESK = 'ServiceDesk',
  VISUAL_FORCE = 'Visualforce',
  NONE = 'None',
}

export enum EnvironmentDisplaySubLocation {
  MOBILE_CARD_FULLVIEW = 'S1MobileCardFullview',
  MOBILE_CARD_PREVIEW = 'S1MobileCardPreview',
  RECORD_HOME_PREVIEW = 'S1RecordHomePreview',
  RECORD_HOME_FULLVIEW = 'S1RecordHomeFullview',
}

export interface EnvironmentDimensions {
  readonly clientHeight: string;
  readonly clientWidth: string;
  readonly height: string;
  readonly width: string;
  readonly maxHeight: string;
  readonly maxWidth: string;
}

export interface User {
  readonly accessibilityModeEnabled: boolean;
  readonly currencyISOCode: string;
  readonly email: string;
  readonly firstName: string;
  readonly fullName: string;
  readonly isDefaultNetwork: boolean;
  readonly language: string;
  readonly lastName: string;
  readonly locale: string;
  readonly networkId: string;
  readonly profileId: string;
  readonly profilePhotoUrl: string;
  readonly profileThumbnailUrl: string;
  readonly roleId: string | null;
  readonly siteUrl: string;
  readonly siteUrlPrefix: string;
  readonly timeZone: string;
  readonly userId: string;
  readonly userName: string;
  readonly userType: UserType;
}
export interface Application {
  readonly applicationId: string;
  readonly authType: ApplicationAuthType;
  readonly canvasUrl: string;
  readonly developerName: string;
  readonly isInstalledPersonalApp: boolean;
  readonly name: string;
  readonly namespace: string;
  readonly options: ApplicationOptions[];
  readonly referenceId: string;
  readonly samlInitiationMethod: string;
  readonly version: string;
}

export enum UserType {
  STANDARD = 'STANDARD',
}

export interface Client {
  readonly oauthToken?: string | null | undefined;
  readonly instanceId?: string | null | undefined;
  readonly instanceUrl?: string | null | undefined;
  readonly targetOrigin?: string | null | undefined;
  readonly refreshToken?: string | null | undefined;
}

export enum ApplicationOptions {
  HIDE_HEADER = 'HideHeader',
  HIDE_SHARE = 'HideShare',
  PERSONAL_ENABLED = 'PersonalEnabled',
}

export enum ApplicationAuthType {
  SIGNED_REQUEST = 'SIGNED_REQUEST',
  OAUTH = 'OAUTH',
}
