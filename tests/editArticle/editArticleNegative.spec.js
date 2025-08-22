import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, user, articleWithoutTags}) => {
  await signUpUser(page, user);
  await createArticle(page, articleWithoutTags);
});

test('Remove an article title for the existing article', async ({ 
  page, 
  createArticlePage, 
  articleWithoutTags
}) => {
  const updatedArticle = { 
    title: '',
    description: faker.lorem.sentence(4),
    text: faker.lorem.sentences(2),
    tags: [] 
  }; 
  
  await editArticle(page, articleWithoutTags, updatedArticle);
  await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async ({ 
  page, 
  createArticlePage, 
  articleWithoutTags 
}) => {
  const updatedArticle = { 
    title: faker.lorem.words(),
    description: '',
    text: faker.lorem.sentences(2),
    tags: [] 
  }; 
  
  await editArticle(page, articleWithoutTags, updatedArticle);
  await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove an article text for the existing article', async ({ 
  page, 
  createArticlePage, 
  articleWithoutTags 
}) => {
  const updatedArticle = { 
    title: faker.lorem.words(),
    description: faker.lorem.sentence(4),
    text: '',
    tags: [] 
  }; 
  
  await editArticle(page, articleWithoutTags, updatedArticle);
  await createArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});