import React from 'react'

class MangaViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      manga: null,
      chapter: null,
      page: null
    }
  }

  componentWillMount () {
    const props = this.props
    const { mangas, chapters, chapterPages, params, currentUser } = props
    const manga = mangas.find(manga => manga.id == params.id)
    let chapter
    let page

    if (typeof manga !== 'undefined') {
      props.view('manga', manga.id, currentUser.id, Date.now())
      chapter = chapters.find(chapter => chapter.number == params.chapter && chapter.mangaId == manga.id)
      if (typeof chapter !== 'undefined') {
        props.view('chapter', chapter.id, currentUser.id, Date.now())
        page = chapterPages.find((page) => page.number == (params.page || 1) && page.chapterId == chapter.id)
        if (typeof page !== 'undefined') {
          props.view('page', page.id, currentUser.id, Date.now())
        }
      }
    }

    this.setState({ manga, chapter, page })
  }

  render () {
    const { manga, chapter } = this.state
    return (
    <div>
      <div>MangaViewer</div>
      <div>{manga.name}</div>
      <div>Chapter {chapter.number}: {chapter.title}</div>
    </div>
    )
  }
}

export default MangaViewer
