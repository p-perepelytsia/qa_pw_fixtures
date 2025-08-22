import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../src/ui/actions/article/createArticle';
import { editArticle } from '../../src/ui/actions/article/editArticle';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Edit an article fields for the existing article with tags', async ({ 
  page,
  articleWithOneTag,
  articleWithTwoTags,
  viewArticlePage
 }) => {
  const initialArticle = articleWithOneTag;
  const updatedArticle = articleWithTwoTags;

  await createArticle(page, initialArticle);
  
  await editArticle(page, initialArticle, updatedArticle);

  const isValidUpdate =
    (!('title' in updatedArticle) || updatedArticle.title.trim() !== '') &&
    (!('description' in updatedArticle) || updatedArticle.description.trim() !== '') &&
    (!('text' in updatedArticle) || updatedArticle.text.trim() !== '');

  if (isValidUpdate) {
    const isAllChanged =
      'title' in updatedArticle && updatedArticle.title !== initialArticle.title &&
      'description' in updatedArticle && updatedArticle.description !== initialArticle.description &&
      'text' in updatedArticle && updatedArticle.text !== initialArticle.text;

    if (isAllChanged) {
      await test.step(`Refresh after update the article`, async () => {
        await page.goBack();
        await page.reload();
      });
    }
  }

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  if (initialArticle.tags && initialArticle.tags.length > 0) {
    for (const tag of initialArticle.tags) {
      if (!updatedArticle.tags.includes(tag)) {
        await viewArticlePage.assertArticleTagIsVisible(tag);
      }
    }
  }
});

test('Edit an article fields for the existing article without tags', async ({ 
  page,
  articleWithoutTags,
  articleWithOneTag,
  viewArticlePage
}) => {
  const initialArticle = articleWithoutTags;
  const updatedArticle = articleWithOneTag;

  await createArticle(page, initialArticle);

  await editArticle(page, initialArticle, updatedArticle);

  const isValidUpdate =
    (!('title' in updatedArticle) || updatedArticle.title.trim() !== '') &&
    (!('description' in updatedArticle) || updatedArticle.description.trim() !== '') &&
    (!('text' in updatedArticle) || updatedArticle.text.trim() !== '');

  if (isValidUpdate) {
    const isAllChanged =
      'title' in updatedArticle && updatedArticle.title !== initialArticle.title &&
      'description' in updatedArticle && updatedArticle.description !== initialArticle.description &&
      'text' in updatedArticle && updatedArticle.text !== initialArticle.text;

    if (isAllChanged) {
      await test.step(`Refresh after update the article`, async () => {
        await page.goBack();
        await page.reload();
      });
    }
  }

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  if (initialArticle.tags && initialArticle.tags.length > 0) {
    for (const tag of initialArticle.tags) {
      if (!updatedArticle.tags.includes(tag)) {
        await viewArticlePage.assertArticleTagIsVisible(tag);
      }
    }
  }
});

test('Remove an article tag for the existing article', async ({ 
  page, 
  articleWithoutTags, 
  articleWithTwoTags, 
  viewArticlePage 
}) => {
  const initialArticle = articleWithTwoTags;
  const updatedArticle = articleWithoutTags;

  await createArticle(page, initialArticle)

  await editArticle(page, initialArticle, updatedArticle, true);

  await test.step(`Refresh after update the article`, async () => {
    await page.goBack();
    await page.reload();
  });

  await viewArticlePage.assertArticleTitleIsVisible(updatedArticle.title);
  await viewArticlePage.assertArticleTextIsVisible(updatedArticle.text);
  if (initialArticle.tags && initialArticle.tags.length > 0) {
    for (const tag of initialArticle.tags) {
      if (!updatedArticle.tags.includes(tag)) {
        await viewArticlePage.assertArticleTagIsNotVisible(tag);
      }
    }
  }
});