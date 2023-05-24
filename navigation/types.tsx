import { NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import {
  CreatPostChildren,
  Request_Status_Type_Enum,
  Request_Type_Enum,
  SuccessScreenType
} from 'constants/Types'

export type RootStackParamList = {
  Intro: undefined
  AuthStack: NavigatorScreenParams<AuthStackParamList>
  NewJob: NavigatorScreenParams<NewJobStackParamList>
  FavoritesFilter: undefined
  SelectLanguage: undefined
  FavoritesMap: undefined
  Notification: undefined
  InviteAndWin: undefined
  QrActivities: undefined
  Events: undefined
  EventDetail: { event: any; isPaid?: boolean; userEvent?: any }
  BuyEvent: { event: any }
  AdditionalProfile: undefined
  EditProfile: undefined
  EditAccount: undefined
  GiftScanner: { userCarnivalGift: any }
  EventScanner: { userEvent: any }
  AttendanceScanner: {
    stageCampSchedule: any
    onSuccess: any
    isClaim: boolean
  }
  CampList: undefined
  CampSchedule: undefined
  CampDetail: undefined
  Assessment: undefined
  AssessmentAnswer: { isContinue: boolean }
  AssessmentDetail: { firstTime: boolean; assessment?: any }
  RedeemGift: { carnivalGift: any }
  ViewOnMap: undefined
  CaregiverProfile: undefined
  WriteReview: undefined
  AddMorePayment: undefined
  CaregiverPostDetails: undefined
  MoreNavigator: NavigatorScreenParams<MoreStackParamList>
  AddChild: undefined
  CreateJobStack: NavigatorScreenParams<CreateJobStackParamList>
  FindStack: NavigatorScreenParams<FindStackParamList>
  MessagesStack: NavigatorScreenParams<MessagesStackParamList>
  RequestStack: NavigatorScreenParams<RequestsStackParamList>
  MainBottomTab: undefined
  SuccessScr: {
    successScr: SuccessScreenType
  }
}
export type CreateJobStackParamList = {
  TypeOfCare: undefined
  FrequencyDate: undefined
  AboutYourFamily: { children: CreatPostChildren[] }
  AboutYourChild: undefined
  HourlyRate: undefined
  Qualifications: undefined
  SelectResponsibilities: undefined
  CreateJob: undefined
  CreatePostDetails: undefined
}
export type MainBottomTabStackParamList = {
  Beranda: undefined
  Find: undefined
  Reward: undefined
  Aktivitas: NavigatorScreenParams<ActivitiesBottomNavigatorParamList>
  Pengaturan: NavigatorScreenParams<MoreStackParamList>
}
export type AuthStackParamList = {
  Login: undefined
  SignupFirstStep: undefined
  SignupSecondStep: undefined
  SignupThirdStep: undefined
  ForgotPassword: undefined
  NewPassword: { email: 'string' }
}
export type NewJobStackParamList = {
  TypeOfCare: undefined
  FrequencyDate: undefined
  AboutYourFamily: undefined
}
export type FindStackParamList = {
  FindSrc: undefined
  ViewOnMap: undefined
  JobDetails: { name: string }
}
export type MessagesStackParamList = {
  Chat: undefined
  VideoCall: undefined
}
export type ActivitiesBottomNavigatorParamList = {
  Activities: undefined
  RequestsInPast: { requestType: Request_Type_Enum }
}
export type RequestsStackParamList = {
  RequestInterview: undefined
  BookingRequest: undefined
  ReviewRequestInterview: undefined
  ReviewRequestBooking: undefined
  ConfirmHour: undefined
  SelectCard: undefined
  InterviewDetails: { type: Request_Status_Type_Enum }
  BookingDetails: { type: Request_Status_Type_Enum }
  ApplicationDetails: { type: Request_Status_Type_Enum }
}

export type HomeStackParamList = {
  HomeSrc: undefined
  MyFavorites: undefined
  EditAccount: undefined
  CampDetail: undefined
}
export type MoreStackParamList = {
  MoreSrc: undefined
  MyPost: undefined
  PaymentMethod: undefined
  MyChildren: undefined
  ProfileSrc: undefined
  ReferFriend: undefined
}
export type ModalScreenNavigationProp = RouteProp<
  RootStackParamList,
  'SuccessScr'
>
export type RequestsInPassScreenNavigationProp = RouteProp<
  ActivitiesBottomNavigatorParamList,
  'RequestsInPast'
>

export type JobDetailsScreenNavigationProp = RouteProp<
  FindStackParamList,
  'JobDetails'
>
export type AboutYourFamilyScreenNavigationProp = RouteProp<
  CreateJobStackParamList,
  'AboutYourFamily'
>
export type InterviewDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  'InterviewDetails'
>
export type BookingDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  'BookingDetails'
>
export type ApplicationDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  'ApplicationDetails'
>
