
import { TestBed } from '@angular/core/testing';

import { CommentGuard } from './comment.guard';
import { HttpClientModule } from '@angular/common/http';

describe('CommentGuard', () => {
  let guard: CommentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientModule]

    });
    guard = TestBed.inject(CommentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
