import { useState } from 'react';
import styles from './character-page.module.css';
import CharacterList from '../CharacterList/character-list';
import CharacterDetail from '../CharacterDetail/character-detail';

export default function CharacterPage() {
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

    return (
        <>
            <nav className={styles.nav}>
                <h1>Rick and Morty Registry</h1>
            </nav>
            <div className={styles.container}>
                <CharacterList onSelectCharacter={setSelectedCharacterId} />
                <div className={styles.detailPanel}>
                    <CharacterDetail characterId={selectedCharacterId} />
                </div>
            </div>
        </>
    );
}