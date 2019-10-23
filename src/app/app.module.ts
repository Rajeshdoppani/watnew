import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NgxMasonryModule } from 'ngx-masonry';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ModalModule } from "ngx-modal";
import { EmbedVideo } from 'ngx-embed-video';
import { PageSliderModule } from 'ng2-page-slider';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { Pipe, PipeTransform } from "@angular/core";
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

// Services //
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login/login.service';
import { PageService } from './services/page/page.service';
import { CategoriesService } from './services/categories/categories.service';
import { MessagingService } from './services/messaging.service';
import { MyfavouritesService } from './services/favourites/myfavourites.service';
import { LiveService } from './services/live/live.service';
import { FollowingpagesfeedsService } from './services/pagefeeds/followingpagesfeeds.service';
import { CelebritypageService } from './services/celebritypage/celebritypage.service';
import { AppforgotpasswordService } from './services/resetpassword/appforgotpassword.service';
import { SharedserviceService } from './services/sharedservice.service';
import { SEOservicesService } from './services/seoservices.service';
import { SocketServiceService } from './services/socket-service.service';
import { PackagesService } from './services/packages.service';


// Components //
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TrendingComponent } from './trending/trending.component';
import { CreatepageComponent } from './createpage/createpage.component';
import { MypageComponent } from './mypage/mypage.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { SocialauthenticationComponent } from './socialauthentication/socialauthentication.component';
import { MypagedetailsComponent } from './mypagedetails/mypagedetails.component';
import { PostdetailsComponent } from './postdetails/postdetails.component';
import { ChangecategoriesComponent } from './changecategories/changecategories.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { LivescoresComponent } from './livescores/livescores.component';
import { GamesComponent } from './games/games.component';
import { PagesComponent } from './pages/pages.component';
import { AbuseComponent } from './abuse/abuse.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { SocialshareComponent } from './socialshare/socialshare.component';
import { SearchComponent } from './search/search.component';
import { MyfollowingComponent } from './myfollowing/myfollowing.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TermsandcondiationComponent } from './termsandcondiation/termsandcondiation.component';
import { PrivacyandpolicyComponent } from './privacyandpolicy/privacyandpolicy.component';
import { RecentactivityComponent } from './recentactivity/recentactivity.component';
import { MyfavouritesComponent } from './myfavourites/myfavourites.component';
import { FollowingpagefeedsComponent } from './followingpagefeeds/followingpagefeeds.component';
import { CelebritypageComponent } from './celebritypage/celebritypage.component';
import { AppforgotpasswordComponent } from './appforgotpassword/appforgotpassword.component';
import { AppaboutusComponent } from './appaboutus/appaboutus.component';
import { ApptermsandconditionComponent } from './apptermsandcondition/apptermsandcondition.component';
import { AppprivacypolicyComponent } from './appprivacypolicy/appprivacypolicy.component';
import { PackagesComponent } from './packages/packages.component';
import { RulesComponent } from './rules/rules.component';


const appRoutes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: {
      title: 'WatNew - A Social Media and Entertainment App',
      description: 'WatNew is a social media and entertainment application. We are a one-stop place where you can get all the social media trends with categories.',
      keywords: 'Top interior design models, Health and Fitness, Live Discussions, Jewellary Designs, Gossip Videos'
    }
  },
  {
    path: 'changecategories',
    component: ChangecategoriesComponent,
    data: {
      title: 'Change Categories | WatNew',
      description: 'Find trending posts of live discussions, breaking news, socialmedia updates, food recipes, health and fitness. Browse our site today.',
      keywords: 'Health and Fitness, Breaking News, Live Discussions, Food recipes, Socialmedia Updates'
    }
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    data: {
      title: 'Change Password | Watnew - A Social Media and Entertainment App',
      description: 'Find trending posts of latest necklace designs and models, indian ethnic wear, arabic mehandi designs. Browse watnew site today.',
      keywords: "Latest sarees with price, Best nail art images, All car models, Men's ethnic wear, North indian recipe videos"
    }
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    data: {
      title: 'My Profile | Watnew - A Social Media and Entertainment App',
      description: 'Find trending posts of gossip videos, latest international news, food and diet, Kids interior design. So, Click here to know more.',
      keywords: "All bike models, Men's casual shirts, Office interior design ideas, Food and Nutrition"
    }
  },
  {
    path: 'socialauth/:status_code/:token/:remember_token/:status',
    component: SocialauthenticationComponent
  },
  {
    path: 'trending',
    component: TrendingComponent,
    data: {
      title: 'Latest Trending News | Best Trending Topics and Updates | Most Popular Videos',
      description: 'WatNew makes it easier for everyone to choose their best trending topics, latest trending news, most popular videos and update categories. So, here you go..',
      keywords: 'Best Trending Movies, Socialmedia Topics, New Trending Videos, Latest Photos, Trending Stories'
    }
  },
  {
    path: 'categories',
    component: CategoriesComponent

  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login | WatNew',
      description: 'We are a one-stop place where you can get all the cricket updates, latest movies, new ring models with funny jokes. with billions of posts on WatNew.',
      keywords: 'South Indian Food Recipes, Inspirational Love Quotes, New dress models, Best Nail Art Images, Hollywood Celebrities'
    }
  },
  {
    path: 'forgetpassword',
    component: ForgetpasswordComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Signup | WatNew',
      description: "We provide you with your daily doses of latest movies, sports news, women's fashion, jewellary models and recipe videos. You will be updated with the trending post and story on social media.",
      keywords: "Latest Movies, Sports News, Jewellary Models, New Recipe Videos, Women's Fashion"
    }
  },
  {
    path: 'home',
    component: HomepageComponent,
    data: {
      title: 'WatNew - A Social Media and Entertainment App',
      description: 'WatNew is a social media and entertainment application. We are a one-stop place where you can get all the social media trends with categories.',
      keywords: 'Top interior design models, Health and Fitness, Live Discussions, Jewellary Designs, Gossip Videos'
    }
  },
  {
    path: 'createpage',
    component: CreatepageComponent,
    data: {
      title: 'Create Page | WatNew',
      description: 'Get latest updates of mehandi designs, celebrities, interior designs, nail arts and automobiles. So, click here to know more.',
      keywords: 'Mehandi Designs, Latest Celebrities, Automobiles, Interior Designs, Nail Arts'
    }
  },
  {
    path: 'mypage',
    component: MypageComponent,
    data: {
      title: 'Mypage | Watnew - A Social Media and Entertainment App',
      description: 'Find trending posts of north indian dishes, wedding wishes, nail art videos, famous indian celebrities. Get latest info only at watnew.',
      keywords: "Interior design ideas, Yoga health benefits, Gossips Movie, Latest breaking news, Women's fashion"
    }
  },
  {
    path: 'post',
    component: CreatepostComponent
  },
  {
    path: 'mypagedetails/:page_id',
    component: MypagedetailsComponent,
    data: {
      title: 'My Page Details | Watnew - A Social Media and Entertainment App',
      description: 'Get latest updates of all bike models, casual shirts, kids interior design, health and Fitness tips. Browse watnew site today.',
      keywords: "South indian recipes, Best friendship quotes, Designer ethnic wear, best nail art designs"
    }
  },
  {
    path: 'postdetails/:page_id',
    component: PostdetailsComponent,
    data: {
      title: 'Post Detail Page | Watnew - A Social Media and Entertainment App',
      description: 'WatNew makes it easier for everyone to choose their comedy hindi movies, football updates, best comedy memes, latest ring & earring models and update categories. So, here you go..',
      keywords: "Latest telugu movies, Kabbadi update news, New funny jokes, Bangles designs & models."
    }
  },
  {
    path: 'live',
    component: LivescoresComponent,
    data: {
      title: 'Live Discussions | Nifty Live Toipcs | Live Games | Live Scores Today',
      description: 'Stay up-to-date by all the latest live discussions, today live scores, nifty live topics and live games right here. And you will be updated with the trending post and story on social media.',
      keywords: 'Live Ads, Trending Live Videos, Live Discussions Platform, All Topics, Live Scores Today'
    }
  },
  {
    path: 'games',
    component: GamesComponent,
    data: {
      title: 'Most popular Games | Free Online Games | Download Games | Latest Video Games',
      description: "When you discover download games you most popular games, latest video games and free online games, save them to boards to keep your ideas organized and easy to find.",
      keywords: 'Online Games, Game Videos, Free Games, Best Free Online Games, Game Tips'
    }
  },
  {
    path: 'pages',
    component: PagesComponent,
    data: {
      title: 'Pages | WatNew',
      description: 'We provide you with your daily doses of latest cricket score live, new comedy videos and interior design models. You will be updated with the trending post and story on social media.',
      keywords: 'Health and Fitness Tips, Latest Breaking News, Live ICC Score, Today Live Discussions, Local News'
    }
  },
  {
    path: 'abusereport/:id',
    component: AbuseComponent
  },
  {
    path: 'enquiry/:id',
    component: EnquiryComponent
  },
  {
    path: 'share/:page_id',
    component: SocialshareComponent
  },
  {
    path: 'search/:key_word',
    component: SearchComponent,
    data: {
      title: 'Serach | Watnew - A Social Media and Entertainment App',
      description: 'Get latest updates of latest movies, live cricket score, best comedy memes, food recipes, inspirational love quotes. So, click here to know more.',
      keywords: 'Saree new models, Mehandi designs, Hollywood Actresses, Latest car models, Outfit ideas'
    }
  },
  {
    path: 'myfollowing',
    component: MyfollowingComponent,
    data: {
      title: 'My Following | Watnew - A Social Media and Entertainment App',
      description: "Get latest udates of latest telugu movies, cricket news, home interior design models, health and fitness, women's fashion. Get latest info only at watnew.",
      keywords: 'Latest jewewllary models, New comedy videos, Street food recipes, Romantic love quotes, Chinise food videos'
    }
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    data: {
      title: 'About us | WatNew',
      description: 'WatNew is a social media updates, new trending fashion, latest movies and entertainment application with billions of posts on WatNew. So, here you go..',
      keywords: 'Latest Automobiles, Out Fit Fashion, Best Interior Design, Health Benefits, Hot Celebrity Photos'
    }
  },
  {
    path: 'privacyandpolicy',
    component: PrivacyandpolicyComponent,
    data: {
      title: 'Privacy and Policy | WatNew',
      description: 'Keeping yourself updated on what sort of live discussions today, regional business news  and Indian teams are currently popular within your industry or niche.',
      keywords: 'Upcoming English Movies, Latest Foot ball News, Funny Videos, Necklace Models, Chinise Food Items'
    }
  },
  {
    path: 'termsandcondition',
    component: TermsandcondiationComponent,
    data: {
      title: 'Terms and Condition | WatNew',
      description: 'WatNew is the place where we show you all the fantastic stuff that just arrived at designer ethnic wear, wedding wishes quotes and street style fashion India.',
      keywords: 'Mehandi Designs Free Download, Indian Celebrities, All Car Models, Causual Wear, Food and Nutrition'
    }
  },
  {
    path: 'activitylog',
    component: RecentactivityComponent,
    data: {
      title: 'Activitylog | Watnew - A Social Media and Entertainment App',
      description: 'Find trending posts of upcoming bollywood movies, live kabbadi news, earring models, english funny joke videos. So, click here know more.',
      keywords: 'Chinise food recipes, Best friendship quotes images, Street fashion, Latest nail art videos'
    }
  },
  {
    path: 'myfavourites',
    component: MyfavouritesComponent,
    data: {
      title: 'My Favourites | Watnew - A Social Media and Entertainment App',
      description: "With billions of posts on Watnew, you'll always find latest car models, fashion tips, party wear dresses, updates and actresses photos. Click here to know more.",
      keywords: 'Office interior design ideas, Fitness diet plan,  Food and Nutrition, Latest National News'
    }
  },
  {
    path: 'mypagefeeds',
    component: FollowingpagefeedsComponent,
    data: {
      title: 'My Page Feeds | Watnew - A Social Media and Entertainment App',
      description: "Get latest updates of latest telugu movies, women's ethnic wear dresses, nutrition and fitness, latest chinise recipes. So, click here to know more.",
      keywords: 'Funny hindi jokes, New tamil movies, Chain and Braclets models, Street food recipes, Latest friendship quotes'
    }
  },
  {
    path: 'celebritypage',
    component: CelebritypageComponent,
    data: {
      title: 'Celebrities Latest Photos | Images | Movie Updates | Actor | Actress Photos',
      description: "With billions of posts on WatNew, you'll always find Indian celebraties , movie updates and actresses photos. Click here to know more.",
      keywords: 'Celebrities of India, Hollywood Celebrities in India, India Celebraties, Tollywood Celebraties, Model Hollywood Celebrities'
    }
  },
  {
    path: 'appforgotpassword/:passcode',
    component: AppforgotpasswordComponent
  },
  {
    path: 'about-us',
    component: AppaboutusComponent
  },
  {
    path: 'privacy-policy',
    component: AppprivacypolicyComponent
  },
  {
    path: 'terms-condition',
    component: ApptermsandconditionComponent
  },
  {
    path: 'packages',
    component: PackagesComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  }
]


@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  /**
   *
   * @param value
   * @returns {number}
   */
  transform(value: number): number {
    return Math.round(value);
  }
}

// call socket service
export function getService(appLoadService: SocketServiceService) {
  return () => appLoadService.InitialService();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    CategoriesComponent,
    HomepageComponent,
    RightsidebarComponent,
    FooterComponent,
    TrendingComponent,
    CreatepageComponent,
    MypageComponent,
    CreatepostComponent,
    ForgetpasswordComponent,
    SocialauthenticationComponent,
    MypagedetailsComponent,
    PostdetailsComponent,
    ChangecategoriesComponent,
    ChangepasswordComponent,
    MyprofileComponent,
    LivescoresComponent,
    GamesComponent,
    PagesComponent,
    AbuseComponent,
    EnquiryComponent,
    SocialshareComponent,
    SearchComponent,
    MyfollowingComponent,
    AboutusComponent,
    TermsandcondiationComponent,
    PrivacyandpolicyComponent,
    RecentactivityComponent,
    MyfavouritesComponent,
    RoundPipe,
    FollowingpagefeedsComponent,
    CelebritypageComponent,
    AppforgotpasswordComponent,
    AppaboutusComponent,
    ApptermsandconditionComponent,
    AppprivacypolicyComponent,
    PackagesComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    TreeViewModule,
    NgxMasonryModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule,
    ModalModule,
    EmbedVideo,
    SlickCarouselModule,
    PageSliderModule,
    NgMasonryGridModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IntlModule,
    DateInputsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularDateTimePickerModule,
    NgMultiSelectDropDownModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0]
    })
  ],
  providers: [SocketServiceService,
    { provide: APP_INITIALIZER, useFactory: getService, deps: [SocketServiceService], multi: true }, SEOservicesService, SharedserviceService, CookieService, LoginService, PageService, CategoriesService, MessagingService, AsyncPipe, MyfavouritesService, LiveService, FollowingpagesfeedsService, CelebritypageService, AppforgotpasswordService, SharedserviceService, PackagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
