import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.activeRoute.queryParams.subscribe((params) => {
      this.searchForm.patchValue(params);
    });
  }

  submitSearch() {
    this.router.navigate(['/'], {
      relativeTo: this.activeRoute,
      queryParams: this.searchForm.value,
    });
  }

}
